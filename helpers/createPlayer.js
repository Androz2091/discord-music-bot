/**
 * Shortcut for creating an Erela.js player within a command
 * @param {*} ctx The discord command context
 */
module.exports = async (ctx) => {
  const { client } = require('..');

  const guild = client.guilds.cache.get(ctx.guildID);
  const member = guild.members.cache.get(ctx.user.id) ?? await guild.members.fetch(ctx.user.id);
  const voiceChannel = member.voice.channel;
  const textChannel = guild.channels.cache.get(ctx.channelID);

  const player = client.manager.create({
    guild: guild.id,
    voiceChannel: voiceChannel.id,
    textChannel: textChannel.id,
    volume: 5,
  });

  return player;
};