function getGuilsIds() {
    if(process.env.DISCORD_GUILD_ID) {
        return process.env.DISCORD_GUILD_ID.split(',').map((id) => id.trim());
    }

    return undefined;
}

module.exports = getGuilsIds;
