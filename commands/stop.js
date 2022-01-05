const { SlashCommand } = require('slash-create');
const getGuilsIds = require('../utils/getGuildIds');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'stop',
            description: 'Stop the player',

            guildIDs: getGuilsIds()
        });
    }

    async run(ctx) {
        
        const { client } = require('..');

        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        queue.destroy();
        return void ctx.sendFollowUp({ content: '🛑 | Stopped the player!' });

    }
};
