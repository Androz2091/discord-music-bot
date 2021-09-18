const { SlashCommand, CommandOptionType} = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'history',
            description: 'Display the queue history',
            options: [
                {
                    name: 'page',
                    type: CommandOptionType.INTEGER,
                    description: 'Specific page number in queue history',
                    required: false
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run(ctx) {
        
        const { client } = require('..');
        
        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        if (!ctx.options.page) ctx.options.page = 1;
        const pageEnd = (-10 * (ctx.options.page - 1)) - 1;
        const pageStart = (pageEnd - 10);
        const currentTrack = queue.current;
        const tracks = queue.previousTracks.slice(pageStart, pageEnd).reverse().map((m, i) => {
            return `${i + (pageEnd * -1)}. **${m.title}** ([link](${m.url}))`;
        });

        return void ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Server Queue History',
                    description: `${tracks.join('\n')}${
                        queue.previousTracks.length > (pageStart * -1)
                            ? `\n...${(queue.previousTracks.length + pageStart)} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]
        });

    }
};
