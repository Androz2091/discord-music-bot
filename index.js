const dotenv = require('dotenv');
const path = require('path');
const { SlashCreator, GatewayServer } = require('slash-create');
const { Client } = require('discord.js');
const { Manager } = require("erela.js");
const { registerManagerEvents } = require('./events');
const { generateDocs } = require('./docs');

dotenv.config();

const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_VOICE_STATES'
  ]
});

client.manager = new Manager({
  nodes: [
    {
      host: process.env.LAVALINK_SERVER_ADDRESS,
      port: parseInt(process.env.LAVALINK_SERVER_PORT),
      password: process.env.LAVALINK_SERVER_PASSWORD,
    },
  ],
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
client.on("raw", (d) => client.manager.updateVoiceState(d));

registerManagerEvents(client);

const creator = new SlashCreator({
  applicationID: process.env.DISCORD_CLIENT_ID,
  token: process.env.DISCORD_CLIENT_TOKEN,
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  client.manager.init(client.user.id);

  client.user.setActivity('you sleep at night', { type: 'WATCHING' });

  console.log('Generating docs...');
  generateDocs(creator.commands);
});

creator
  .withServer(
    new GatewayServer(
      (handler) => client.ws.on('INTERACTION_CREATE', handler)
    )
  )
  .registerCommandsIn(path.join(__dirname, 'commands'));

if (process.env.DISCORD_GUILD_ID) creator.syncCommandsIn(process.env.DISCORD_GUILD_ID);
else creator.syncCommands();

client.login(process.env.DISCORD_CLIENT_TOKEN);

module.exports = {
  client,
  creator
};
