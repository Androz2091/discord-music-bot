const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'jump',
            description: 'Jump to a specific track',
            options: [
                {
                    name: 'tracks',
                    description: 'The number of tracks to skip',
                    type: CommandOptionType.INTEGER
                }
            ],
            
            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        
        const trackIndex = ctx.options.tracks - 1;
        const trackName = queue.tracks[trackIndex].title;
        queue.jump(trackIndex);

        ctx.sendFollowUp({ content: `⏭ | **${trackName}** has jumped the queue!` });
    }
};
