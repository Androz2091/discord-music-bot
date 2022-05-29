const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'volume',
      description: 'Set music volume',
      options: [
        {
          name: 'amount',
          type: CommandOptionType.INTEGER,
          description: 'The volume amount to set (0-100)',
          required: false
        }
      ],

      guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    });
  }

  async run(ctx) {
    try {
      await ctx.defer();

      const player = await createPlayer(ctx);
      if (!player.playing) {
        return void ctx.sendFollowUp({ content: '❌ | No music in the queue!' })
      }

      const vol = parseInt(ctx.options.amount);
      if (!vol) return void ctx.sendFollowUp({ content: `🎧 | Current volume is **${player.volume}**%!` });
      if (vol < 0 || vol > 100) return void ctx.sendFollowUp({ content: '❌ | Volume range must be 0-100' });

      player.setVolume(vol);

      ctx.sendFollowUp({ content: `✅ | Volume set to **${vol}%**!` });
    } catch (err) {
      handleError(err, ctx, 'volume');
    }
  }
};
