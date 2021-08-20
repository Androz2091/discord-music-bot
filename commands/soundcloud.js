const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "soundcloud",
            description: "Plays a song from soundcloud",
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

    async run(ctx) {
        
        const { creator } = require('..');
        creator.commands.find((cmd) => cmd.commandName === 'play').run(ctx, true);

    }
}
