const { parseEmbedObject } = require('../util');
const fetch = require('node-fetch');
/**
 * Sends a message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function sendMessage(message, channel) {
    const embed = message?.toJSON?.() && message?.toJSON?.() instanceof Object ? message?.toJSON?.() : (message && message instanceof Object ? parseEmbedObject(message) : {});
    let JsonBody = {
        content: `${message}`,
    }
    if(embed.type) { 
        JsonBody.content = null;
        JsonBody.embed = embed;
    }
        if(message.length > 2000) return new Error('The message lenght is bigger than 2000.')
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages`, {
        method: 'POST',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json())
};
/**
 * Deletes message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function deleteMessage(message, channel) {
    fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
}
/**
 * Unpins a message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The message content(or embed).
 * @param {string} messageId - The ID of the message.
 */
async function editMessage(message, channel, messageId) {
    const embed = message?.toJSON?.() && message?.toJSON?.() instanceof Object ? message?.toJSON?.() : (message && message instanceof Object ? parseEmbedObject(message) : {});
    let JsonBody = {
        content: `${message}`,
    }
    if(embed.type) { 
        JsonBody.content = null;
        JsonBody.embed = embed;
    }
    if(message.length > 2000) return new Error('The message lenght is bigger than 2000.')
    fetch(`https://discord.com/api/v8/channels/${channel}/messages/${messageId}`, {
        method: 'PATCH',
        body: JSON.stringify(JsonBody),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
}
/**
 * Adds a reaction to the message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 * @param {string} emoji - The emoji.
 */
async function addReaction(message, channel, emoji) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}/reactions/${encodeURI(emoji)}/@me`, {
        method: 'PUT',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
}
/**
 * Removes reaction from the client.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 * @param {string} emoji - The emoji.
 */
async function removeReaction(message, channel, emoji) {
    fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}/reactions/${encodeURI(emoji)}/@me`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
}
/**
 * Gets channel.
 * 
 * @param {string} channel - The ID of the channel.
 */
async function getChannel(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(json => this.channels.set(json.id, json));
};
/**
 * Deletes a channel.
 * 
 * @param {string} channel - The ID of the channel.
 */
async function deleteChannel(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(json => this.channels.set(json.id, json));
};
/**
 * Gets a message from a channel.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function getMessage(channel, message) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};
/**
 * Removes the reaction from a user.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 * @param {string} emoji - The emoji.
 * @param {string} user - The ID of the user.
 */
async function removeReactionFromUser(channel, message, emoji, user) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}/reactions/${encodeURI(emoji)}/${user}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/**
 * Gets a reaction.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 * @param {string} emoji - The emoji.
 */
async function getReaction(channel, message, emoji) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}/reactions/${encodeURI(emoji)}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};
/**
 * Removes all of the reactions from a message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function removeAllReaction(channel, message) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/${message}/reactions`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/**
 * Bulk deletes messages.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} number - How many messages will get deleted(2 - 100).
 */
async function bulkDeleteMessage(channel, number) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/messages/bulk-delete`, {
        method: 'POST',
        body: JSON.stringify({ messages: number}),
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/**
 * Gets channel invites.
 * 
 * @param {string} channel - The ID of the channel.
 */
async function getChannelInvites(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};
/**
 * Creates a channel invite.
 * 
 * @param {string} channel - The ID of the channel.
 */
async function createChannelInvite(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
        method: 'POST',
        body: {},
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};
/**
 * Triggers typing event.
 * 
 * @param {string} channel - The ID of the channel.
 */
async function startTyping(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/typing`, {
        method: 'POST',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/**
 * Shows pinned messages
 * 
 * @param {string} channel - The ID of the channel.
 */
async function getPinnedMessages(channel) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/pins`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(res => res.json());
};
/**
 * Pins a message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function pinMessage(channel, message) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/pins/${message}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};
/**
 * Unpins a message.
 * 
 * @param {string} channel - The ID of the channel.
 * @param {string} message - The ID of the message.
 */
async function unpinMessage(channel, message) {
    return fetch(`https://discord.com/api/v8/channels/${channel}/pins/${message}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    })
};

module.exports = {
    sendMessage,
    deleteMessage,
    editMessage,
    addReaction,
    removeReaction,
    getChannel,
    deleteChannel,
    getMessage,
    removeReactionFromUser,
    getReaction,
    removeAllReaction,
    bulkDeleteMessage,
    getChannelInvites,
    createChannelInvite,
    startTyping,
    getPinnedMessages,
    pinMessage,
    unpinMessage
}