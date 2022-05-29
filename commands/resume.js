const { SlashCommand } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'resume',
      description: 'Resume the current song',

      guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    });
  }

  async run (ctx) {
    try {
      await ctx.defer();

      const player = await createPlayer(ctx);
      if (!player.playing && !player.paused) {
        return void ctx.sendFollowUp({ content: '❌ | No music in the queue!' })
      }

      player.pause(false);

      return void ctx.sendFollowUp({ content: '▶ | Resumed!' });
    } catch (err) {
      handleError(err, ctx, 'resume');
    }
  }
};
