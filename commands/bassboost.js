const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "play",
            description: "Plays a song from youtube",
            options: [
                {
                    name: "query",
                    type: CommandOptionType.STRING,
                    description: "The song you want to play",
                    required: true
                }
            ]
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.sendFollowUp({ content: "❌ | No music is being played!" });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes("bassboost"),
            normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
        });

        return void interaction.sendFollowUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!` });
    }
}
