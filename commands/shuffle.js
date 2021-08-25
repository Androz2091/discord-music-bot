const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "shuffle",
            description: "Shuffles the queue",

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.sendFollowUp({ content: "❌ | No music is being played!" });
        
        await queue.shuffle();
        
        interaction.sendFollowUp({ content: "✅ | Queue has been shuffled!" });
    }
}
