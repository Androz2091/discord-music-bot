const { SlashCommand } = require('slash-create');
const getGuilsIds = require('../utils/getGuildIds');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'clear',
            description: 'Clear the current queue.',
            
            guildIDs: getGuilsIds()
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue) return void ctx.sendFollowUp({ content: '❌ | No music in the queue!' });
        
        queue.clear();

        ctx.sendFollowUp({ content: '❌ | Queue cleared.' });
    }
};
