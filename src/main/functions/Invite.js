const fetch = require('node-fetch');
/**
 * Gets the invite.
 * 
 * @param {string} invite - The ID of the message.
 */
async function getInvite(invite) {
    return fetch(`https://discord.com/api/v8/invites/${invite}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json())
}
/**
 * Deletes the invite.
 * 
 * @param {string} invite - The invite.
 */
async function deleteInvite(invite) {
    return fetch(`https://discord.com/api/v8/invites/${invite}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json())
}

module.exports = {
    getInvite,
    deleteInvite
}