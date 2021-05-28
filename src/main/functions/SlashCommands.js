const fetch = require('node-fetch');

async function getCommands(botId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/commands`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function createCommand(name, description, botId, options) {
    let JsonBody = {
        name: name,
        description: description
    }
    if(options) {
        JsonBody.options = options;
    }
    return fetch(`https://discord.com/api/v8/applications/${botId}/commands`, {
        method: 'POST',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function createGuildCommand(name, description, botId, guild, options) {
    let JsonBody = {
        name: name,
        description: description
    }
    if(options) {
        JsonBody.options = options;
    }
    return fetch(`https://discord.com/api/v8/applications/${botId}/guilds/${guild}/commands`, {
        method: 'POST',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};


async function getCommand(id, botId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/commands/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function editCommand(commandId, name, description, botId, options) {
    let JsonBody = {
        name: name,
        description: description
    }
    if(options) {
        JsonBody.options = options;
    }
    return fetch(`https://discord.com/api/v8/applications/${botId}/commands/${commandId}`, {
        method: 'PATCH',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function deleteCommand(commandId, botId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/commands/${commandId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};

async function getGuildCommands(id, botId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/guilds/${id}/commands`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function getGuildCommand(id, botId, commandId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/guilds/${id}/commands/${commandId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function editGuildCommand(commandId, guildId, name, description, botId, options) {
    let JsonBody = {
        name: name,
        description: description
    }
    if(options) {
        JsonBody.options = options;
    }
    return fetch(`https://discord.com/api/v8/applications/${botId}/guilds/${guildId}/commands/${commandId}`, {
        method: 'PATCH',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json());
};

async function deleteGuildCommand(commandId, botId, guildId) {
    return fetch(`https://discord.com/api/v8/applications/${botId}/guilds/${guildId}/commands/${commandId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};

module.exports = {
    createCommand,
    createGuildCommand,
    getCommand,
    editCommand,
    deleteCommand,
    getGuildCommands,
    getGuildCommand,
    editGuildCommand,
    deleteGuildCommand,
    getCommands
}