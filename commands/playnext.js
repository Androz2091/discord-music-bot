const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'playnext',
      description: 'Add a song to the top of the queue',
      options: [
        {
          name: 'query',
          type: CommandOptionType.STRING,
          description: 'The song you want to play next',
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

      const query = ctx.options.query;

      const { client } = require('..');
      const searchResult = await client.manager.search(
        query,
        ctx.user,
      );

      if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

      player.connect();

      player.queue.add(searchResult.tracks[0], 0);

      ctx.sendFollowUp({ content: `🎶 | Track **${searchResult.tracks[0].title}** queued next!` });
    } catch (err) {
      handleError(err, ctx, 'playnext');
    }
  }
};
