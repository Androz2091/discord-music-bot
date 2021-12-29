const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'nightcore',
            description: 'Toggle nightcore filter',

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async run(ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        await queue.setFilters({
            nightcore: !queue.getFiltersEnabled().includes('nightcore')
        });

        setTimeout(() => {
            return void ctx.sendFollowUp({ content: `🎵 | Nightcore ${queue.getFiltersEnabled().includes('nightcore') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);
    }
};
