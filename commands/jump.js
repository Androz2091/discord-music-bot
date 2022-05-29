const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'jump',
      description: 'Jump to a specific track',
      options: [
        {
          name: 'tracks',
          description: 'The number of tracks to skip',
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

      player.queue.remove(0, ctx.options.tracks - 1);
      // stop current song as well
      player.stop();

      ctx.sendFollowUp({ content: `⏭ | Skiped ${ctx.options.tracks} songs!` });
    } catch (err) {
      handleError(err, ctx, 'jump');
    }
  }
};
