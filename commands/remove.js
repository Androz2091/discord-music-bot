const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'remove',
            description: 'Remove a specific track',
            options: [
                {
                    name: 'track',
                    description: 'The number of the track to remove',
                    type: CommandOptionType.INTEGER,
                    required: true
                }
            ],
            
            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        
        const trackIndex = ctx.options.track - 1;
        const trackName = queue.tracks[trackIndex].title;
        queue.remove(trackIndex);

        ctx.sendFollowUp({ content: `❌ | Removed track ${trackName}.` });
    }
};
