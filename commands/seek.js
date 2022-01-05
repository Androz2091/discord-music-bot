const { SlashCommand, CommandOptionType } = require('slash-create');
const getGuilsIds = require('../utils/getGuildIds');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'seek',
            description: 'Seek to the given time',
            options: [
                {
                    name: 'time',
                    description: 'The time to seek to (in seconds)',
                    type: CommandOptionType.INTEGER
                }
            ],

            guildIDs: getGuilsIds()
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        
        const time = ctx.options.time * 1000;
        await queue.seek(time);

        ctx.sendFollowUp({ content: `✅ | Seeked to ${time / 1000} seconds` });
    }
};
