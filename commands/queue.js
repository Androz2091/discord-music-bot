const { SlashCommand, CommandOptionType} = require('slash-create');
var numeral = require('numeral');
const createPlayer = require('../helpers/createPlayer');
const handleError = require('../helpers/handleError');

const PAGE_SIZE = 10;

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'queue',
      description: 'See the queue',
      options: [
        {
          name: 'page',
          type: CommandOptionType.INTEGER,
          description: 'Specific page number in queue',
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

      const curPage = ctx.options.page || 1;
      const pageStart = PAGE_SIZE * (curPage - 1);
      const pageEnd = pageStart + PAGE_SIZE;
      const currentTrack = player.queue.current;
      const tracks = player.queue.slice(pageStart, pageEnd).map((m, i) => {
        return `${i + pageStart + 1}. **${m.title}** ([link](${m.uri}))`;
      });
      const totalPages = Math.ceil(player.queue.length / PAGE_SIZE);

      return void ctx.sendFollowUp({
          embeds: [
            {
              title: 'Server Queue',
              description: `${tracks.join('\n')}${
                player.queue.length > pageEnd
                  ? `\n...${player.queue.length - pageEnd} more track(s)`
                  : ''
              }`,
              color: 0xff0000,
              fields: [
                { name: 'Page', value: `${curPage} / ${totalPages}` },
                { name: 'Length', value: `${numeral(player.queue.duration / 1000).format('00:00:00')}` },
                { name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.uri}))` }
              ]
            }
          ]
        });
    } catch (err) {
      handleError(err, ctx, 'queue');
    }
  }
};
