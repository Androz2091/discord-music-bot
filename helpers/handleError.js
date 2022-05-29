/**
 * Helper to handle errors with commands
 * @param {Error} err The error
 * @param {*} ctx The command context
 * @param {String} command The command name
 */
module.exports = (err, ctx, command) => {
  console.error(`Error with the "${command}" command:`, err);
  ctx.sendFollowUp({ content: `There was an error processing your command` });
}