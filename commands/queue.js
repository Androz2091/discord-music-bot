const { SlashCommand, CommandOptionType} = require('slash-create');

const PAGE_SIZE = 10;

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'queue',
            description: 'See the queue',
            options: [
                {
                    name: 'page',
                    type: CommandOptionType.INTEGER,
                    description: 'Specific page number in queue',
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
        const curPage = ctx.options.page || 1;
        const pageStart = PAGE_SIZE * (curPage - 1);
        const pageEnd = pageStart + PAGE_SIZE;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });
        const totalPages = Math.ceil(queue.tracks.length / PAGE_SIZE);

        return void ctx.sendFollowUp({
            embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [
                        { name: 'Page', value: `${curPage} / ${totalPages}` },
                        { name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }
                    ]
                }
            ]
        });

    }
};
