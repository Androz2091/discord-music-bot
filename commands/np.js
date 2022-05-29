const { SlashCommand } = require('slash-create');
const numeral = require('numeral');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'np',
      description: 'See what\'s currently being played',

      guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    });
  }

  async run (ctx) {
    try {
      await ctx.defer();

      const player = await createPlayer(ctx);
      if (!player.playing) {
        return void ctx.sendFollowUp({ content: '❌ | No music is being played!' })
      }

      const elapsedTime = `${numeral(player.position / 1000).format('00:00:00')}/${numeral(player.queue.current.duration / 1000).format('00:00:00')}`

      return void ctx.sendFollowUp({
        embeds: [
          {
            title: 'Now Playing',
            description: `🎶 | **${player.queue.current.title}**! (${elapsedTime}))`,
            color: 0xffffff
          }
        ]
      });
    } catch (err) {
      handleError(err, ctx, 'np');
    }
  }
};
