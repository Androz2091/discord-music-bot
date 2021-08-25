const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueueRepeatMode } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "loop",
            description: "Sets loop mode",
            options: [
                {
                    name: "mode",
                    type: CommandOptionType.INTEGER,
                    description: "Loop type",
                    required: true,
                    choices: [
                        {
                            name: "Off",
                            value: QueueRepeatMode.OFF
                        },
                        {
                            name: "Track",
                            value: QueueRepeatMode.TRACK
                        },
                        {
                            name: "Queue",
                            value: QueueRepeatMode.QUEUE
                        },
                        {
                            name: "Autoplay",
                            value: QueueRepeatMode.AUTOPLAY
                        }
                    ]
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: "❌ | No music is being played!" });
        const loopMode = ctx.options.mode;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void ctx.sendFollowUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    }
}
