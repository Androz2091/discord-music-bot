const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "pause",
            description: "Pause the current song"
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(true);
        return void ctx.sendFollowUp({ content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!" });
    }
}
