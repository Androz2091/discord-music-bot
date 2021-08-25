const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "back",
            description: "Plays the previous track",

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.sendFollowUp({ content: "❌ | No music is being played!" });
        
        await queue.back();

        interaction.sendFollowUp({ content: "✅ | Playing the previous track!" });
    }
}
