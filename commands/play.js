const { SlashCommand, CommandOptionType } = require('slash-create');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'play',
      description: 'Play a song from youtube',
      options: [
        {
          name: 'query',
          type: CommandOptionType.STRING,
          description: 'The song you want to play',
          required: true
        }
      ],

      guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
    });
  }

  async run (ctx) {
    try {
      const { client } = require('..');

      await ctx.defer();

      const query = ctx.options.query;

      const searchResult = await client.manager.search(
        query,
        ctx.user,
      );

      if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

      const player = await createPlayer(ctx);

      player.connect();

      if (searchResult.playlist) {
        player.queue.add(searchResult.tracks);

        ctx.sendFollowUp({ content: `🎶 | Playlist of ${searchResult.tracks.length} songs queued!` });
      } else {
        player.queue.add(searchResult.tracks[0]);

        ctx.sendFollowUp({ content: `🎶 | Track **${searchResult.tracks[0].title}** queued!` });
      } 

      if (!player.playing && !player.paused) {
        player.play();
      }
    } catch (err) {
      handleError(err, ctx, 'play');
    }
  }
};
