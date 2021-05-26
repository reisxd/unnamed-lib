const fetch = require('node-fetch');

/**
 * Gets the client.
 */
async function currentUser() {
    return fetch(`https://discord.com/api/v8/users/@me`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json()).then(json => {
        this.users.set(json.id, json);
    })
}

/**
 * Gets a user.
 * 
 * @param {string} user - The ID of the user.
 */
async function getUser(user) {
    return fetch(`https://discord.com/api/v8/users/${user}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json()).then(json => {
        this.users.set(json.id, json);
    })
}

/**
 * Gets the guilds that the client is in.
 */
async function getGuilds() {
    return fetch(`https://discord.com/api/v8/users/@me/guilds`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json()).then(json => {
        this.guilds.set(json.id, json);
    })
}

/**
 * Leaves the guild.
 * 
 * @param {string} guild - The ID of the guild.
 */
async function leaveGuild(guild) {
    return fetch(`https://discord.com/api/v8/users/@me/guilds/${guild}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
}

module.exports = {
    currentUser,
    getUser,
    getGuilds,
    leaveGuild
}