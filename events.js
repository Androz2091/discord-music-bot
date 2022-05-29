module.exports.registerManagerEvents = (client) => {
  client.manager
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`🎶 | Now playing: **${track.title}**`);
  })
  .on("trackError", (player, track, payload) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Error Playing **${track.title}**`);

    console.error('Error Playing Song', payload);
  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("✅ | Queue finished!");

    player.disconnect();
    player.destroy();
  });
};
