const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "seek",
            description: "Seeks to the given time",
            options: [
                {
                    name: "time",
                    description: "The time to seek to (in seconds)",
                    type: CommandOptionType.INTEGER
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.sendFollowUp({ content: "❌ | No music is being played!" });
        
        const time = ctx.options.time * 1000;
        await queue.seek(time);

        interaction.sendFollowUp({ content: `✅ | Seeked to ${time / 1000} seconds` });
    }
}
