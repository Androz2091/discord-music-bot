const { SlashCommand } = require('slash-create');
const getGuilsIds = require('../utils/getGuildIds');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'skip',
            description: 'Skip to the current song',

            guildIDs: getGuilsIds()
        });
    }

    async run(ctx) {
        
        const { client } = require('..');
        
        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void ctx.sendFollowUp({
            content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        });

    }
};
