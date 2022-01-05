const dotenv = require('dotenv');
const path = require('path');
const { SlashCreator, GatewayServer } = require('slash-create');
const { Client } = require('discord.js');
const { Player } = require('discord-player');
const { registerPlayerEvents } = require('./events');
const { generateDocs } = require('./docs');
const getGuildIds = require('./utils/getGuildIds');

dotenv.config();

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_VOICE_STATES'
    ]
});

client.player = new Player(client);
registerPlayerEvents(client.player);

const creator = new SlashCreator({
    applicationID: process.env.DISCORD_CLIENT_ID,
    token: process.env.DISCORD_CLIENT_TOKEN,
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    console.log('Generating docs...');
    generateDocs(creator.commands);
    console.log('Docs generated!');
});

creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on('INTERACTION_CREATE', handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

const guildIds = getGuildIds();
if (guildIds && guildIds.length > 0) {
    const syncPromises = guildIds.map(() => creator.syncCommandsIn(process.env.DISCORD_GUILD_ID));
    Promise.all(syncPromises).then(() => console.log('Commands synced'));
} else {
    creator.syncCommandsAsync().then(() => console.log('Commands synced'));
}

client.login(process.env.DISCORD_CLIENT_TOKEN);

module.exports = {
    client,
    creator
};
