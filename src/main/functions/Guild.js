const fetch = require('node-fetch');

/**
 * Adds a role to the user.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 * @param {string} role - The ID of the role.
 */
function addRole(guild, user, role) {
        fetch(`https://discord.com/api/v8/guilds/${guild}/members/${user}/roles/${role}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bot ${this.opt.token}`,
                'content-type': 'application/json'
            }
        }
    )

}

/**
 * Removes the role from the user.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 * @param {string} role - The ID of the role.
 */
function removeRole(guild, user, role) {
    fetch(`https://discord.com/api/v8/guilds/${guild}/members/${user}/roles/${role}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }
    )
}

/**
 * Gets the guild.
 * 
 * @param {string} guild - The ID of the guild.
 */
async function getGuild(guild) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(json => this.guilds.set(json.id, json));
};

/**
 * Gets the guild channels.
 * 
 * @param {string} guild - The ID of the guild.
 */
async function getChannels(guild) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/channels`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};

/**
 * Gets the guild member.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} member - The ID of the member.
 */
async function getGuildMember(guild, member) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/members/${member}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());//.then(json => console.log(json));//this.guilds.get(json.id).members.set(json.user.id, json));
};

/**
 * Lists guild members
 * 
 * Needs special intents.
 * @param {string} guild - The ID of the guild.
 * @param {string} limit - The limit(1 - 1000).
 */
async function listGuildMember(guild, limit) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/members?limit=${limit || '1'}`, {
        method: 'GET',
        body: JSON.stringify({ }),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json())//.then(json => this.guilds.get(json.id).members.set(json.user.id, json));
};

/**
 * Searches guild member.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} query - The nickname/username to search.
 * @param {string} limit - The limit.
 */
async function searchGuildMember(guild, query, limit) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/members/search?query=${query}&limit=${limit || '0'}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json())//.then(json => this.guilds.get(json.id).members.set(json.user.id, json));
};

/**
 * Kicks the member from the guild.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 */
async function kickMember(guild, user) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/members/${user}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};

/**
 * Gets ban list.
 * 
 * @param {string} guild - The ID of the guild.
 */
async function getBans(guild) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/bans`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};

/**
 * Gets the banned member.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 */
async function getBan(guild, user) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/bans/${user}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};

/**
 * Bans the member from the guild.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 * @param {string} reason - The reason.
 * @param {string} deleteMessageDays - Number of days of messages to delete, must be between 0 and 7.
 */
async function banMember(guild, user, reason, deleteMessageDays) {
    let JsonBody = {
        reason: reason,
        delete_message_days: deleteMessageDays
    }
    if(!JsonBody.reason) {
        delete JsonBody.reason
    }
    if(!JsonBody.delete_message_days) {
        delete JsonBody.delete_message_days
    }
    return fetch(`https://discord.com/api/v8/guilds/${guild}/bans/${user}`, {
        method: 'PUT',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};

/**
 * Unbans the member from the guild.
 * 
 * @param {string} guild - The ID of the guild.
 * @param {string} user - The ID of the member.
 */
async function unbanMember(guild, user) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/bans/${user}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/*
THIS FUNCTION IS NOT FINISHED. PLEASE DO NOT USE IT.
async function hasPermission(guild, member) {
    let Guild;
    const getFromCache = await this.guilds.get(guild)
    if(!getFromCache) {
        Guild = await this.getGuild(guild)
    } else {
        Guild = getFromCache;
    }
    const Member = await this.getGuildMember(guild, member)
    const MemberRoles = Member.roles
    let Roles = Guild.roles
    let Role = Roles.find(role => role.id === MemberRoles)
    return console.log(this.getReadablePerms(Role));
};
*/
module.exports = {
    addRole,
    removeRole,
    getGuild,
    getChannels,
    getGuildMember,
    listGuildMember,
    searchGuildMember,
    kickMember,
    getBans,
    getBan,
    banMember,
    unbanMember,
    //hasPermission
}