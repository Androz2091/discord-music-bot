const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "resume",
            description: "Resume the current song",

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(false);
        return void ctx.sendFollowUp({ content: !paused ? "▶ | Resumed!" : "❌ | Something went wrong!" });
    }
}
