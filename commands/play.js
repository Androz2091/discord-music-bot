const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType, QueueRepeatMode } = require('discord-player');

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

        const { client } = require('..');

        await ctx.defer();

        const guild = client.guilds.cache.get(ctx.guildID);
        const channel = guild.channels.cache.get(ctx.channelID);
        const query = ctx.options.query;
        const searchResult = await client.player
            .search(query, {
                requestedBy: ctx.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });
        if (!searchResult || !searchResult.tracks.length) return void ctx.sendFollowUp({ content: 'No results were found!' });

        let queue = await client.player.createQueue(guild, {
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
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.insert(searchResult.tracks[0]);

/*
/loop mode:off
/play Iz9RUw7NwDY
/skip
/loop mode:on
*/

       queue = client.player.getQueue(ctx.guildID);


        // Play
        if (!queue.playing) {

           await queue.play();

       } else {

        // Turn off loop
        queue.setRepeatMode( 0 );

        // Skip track
        const currentTrack = queue.current;
        const success = queue.skip();

        // You HAVE TO await this context update or nothing works.
        await ctx.sendFollowUp({
            content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
        });

        // Turn looping back on again.
        // This must be done here, probably because it has to be done aftter the conext update.
        queue.setRepeatMode( 1 );

       }

        // Auto set loop
        queue.setRepeatMode( 1 );
    }
};
