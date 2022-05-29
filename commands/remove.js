const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'remove',
      description: 'Remove a specific track',
      options: [
        {
          name: 'track',
          description: 'The number of the track to remove',
          type: CommandOptionType.INTEGER,
          required: true
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

      const trackIndex = ctx.options.track - 1;
      const trackName = player.queue[trackIndex].title;
      player.queue.remove(trackIndex);

      ctx.sendFollowUp({ content: `❌ | Removed track ${trackName}.` });
    } catch (err) {
      handleError(err, ctx, 'remove');
    }
  }
};
