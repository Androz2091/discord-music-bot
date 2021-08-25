const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "jump",
            description: "Jumps to a specific track",
            options: [
                {
                    name: "tracks",
                    description: "The number of tracks to skip",
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
        
        const tracksCount = ctx.options.tracks;
        queue.jump(tracksCount);

        interaction.sendFollowUp({ content: `⏭ | Skipped ${tracksCount} tracks` });
    }
}
