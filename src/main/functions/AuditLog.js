const fetch = require('node-fetch');

/**
 * Gets the audit log.
 * 
 * @param {string} guild - The ID of the channel.
 */
async function getAuditLog(guild) {
    return fetch(`https://discord.com/api/v8/guilds/${guild}/audit-logs`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${this.opt.token}`,
            'content-type': 'application/json'
        }
    }).then(r => r.json())
}

module.exports = {
    getAuditLog
}