const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'seek',
      description: 'Seek to the given time',
      options: [
        {
          name: 'time',
          description: 'The time to seek to (in seconds)',
          type: CommandOptionType.INTEGER
        }
      ],

      guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    });
  }

  async run (ctx) {
    try {
      await ctx.defer();

      const player = await createPlayer(ctx);
      if (!player.playing) {
        return void ctx.sendFollowUp({ content: '❌ | No music in the queue!' })
      }

      player.seek(ctx.options.time * 1000);

      ctx.sendFollowUp({ content: `✅ | Seeked to ${ctx.options.time} seconds` });
    } catch (err) {
      handleError(err, ctx, 'seek');
    }
  }
};
