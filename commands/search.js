const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');
const { YouTube } = require('youtube-sr');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'search',
            description: 'Search youtube',
            options: [
                {
                    name: 'query',
                    type: CommandOptionType.STRING,
                    description: 'The song you want to search',
                    required: true,
                    autocomplete: true
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [process.env.DISCORD_GUILD_ID] : undefined
        });
    }

    async autocomplete(ctx) {
        const suggestions = await YouTube.search(ctx.options.query, {
            type: 'video',
            limit: 10
        }).catch(() => {});
        if (!suggestions || !suggestions.length) return [];

        return ctx.sendResults(suggestions.map((m, i) => ({ name: `${i+1}. ${m.title}`, value: m.url })));
    }

    async run(ctx) {

        const { client } = require('..');
        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

        const queue = await client.player.createQueue(guild, {
            metadata: channel
        });

        const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(ctx.guildID);
            return void ctx.sendFollowUp({ content: 'Could not join your voice channel!' });
        }

        await ctx.sendFollowUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};
