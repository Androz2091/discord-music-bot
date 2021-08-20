const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "resume",
            description: "Resume the current song"
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: "❌ | No music is being played!" });
        const success = queue.setPaused(false);
        return void ctx.sendFollowUp({ content: success ? "▶ | Resumed!" : "❌ | Something went wrong!" });
    }
}
