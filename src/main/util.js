const { Inflate } = require('pako');
const WSEvents = require('./events/wsEvents.json');

module.exports = {
    /**
     * Converts the object to readable-by-discord embed object.
     * @param {object} obj The object to parse from.
     * @returns {object} the object readable by the discord API (mostly contains snake_case)
     */
    parseEmbedObject: (obj) => {
        let total = {
            type: typeof obj.type === 'string' ? obj.type : "rich",
            title: (obj.title || "").slice(0, 256),
            description: (obj.description || "").slice(0, 2048),
            fields: [],
            url: obj.url
        };

        if (obj.fields) {
            if (typeof obj.fields === 'object')
                for (const field in obj.fields)
                    total.fields.push({ name: field.slice(0, 256), value: obj.fields[field].slice(0, 1024) });
            else if (Array.isArray(obj.fields) && obj.fields.every(x => typeof x === 'object' && x.name && x.value))
                total.fields = obj.fields.map(x => { return { name: x.name, value: x.value, inline: x.inline || false } });
        } else
            delete total['fields'];
        
        if (obj.color && typeof obj.color === 'number')
            total.color = obj.color;

        if (obj.footer) {
            if (typeof obj.footer === 'string') total.footer = { text: obj.footer };
            else if (typeof obj.footer === 'object') total.footer = { text: obj.footer.text, icon_url: obj.footer.iconURL };
            else throw new Error(`Invalid type for a footer: ${typeof obj.footer}`);
            total.footer.text = total.footer.text.slice(0, 2048);
        }

        if (obj.author) {
            if (typeof obj.author === 'object') {
                let author = {};
                if (obj.author.name) author.name = obj.author.name.slice(0, 256);
                if (obj.author.url) author.url = obj.author.url;
                if (obj.author.iconURL) author.icon_url = obj.author.iconURL;
                if (author) total.author = author;
            } else if (typeof obj.author === 'string')
                total.author = { name: obj.author };
        }

        if (obj.thumbnail && typeof obj.thumbnail === 'string') total.thumbnail = { url: obj.thumbnail };
        if (obj.image && typeof obj.image === 'string') total.image = { url: obj.image };
        if (obj.includeTimestamp) total.timestamp = new Date().toISOString();
        if (total.fields && obj.inlineFields !== undefined)
            for (const field of total.fields)
                field.inline = obj.inlineFields || false;

        // clear out undefined variables or empty arrays
        for (const key in total)
            if (!total[key] || (Array.isArray(total[key]) && !total[key].length))
                delete total[key];
        
        return total;
    },
    
    /**
     * Adjusts intent from a gateway event name/intent string.
     * Context: https://discord.com/developers/docs/topics/gateway#gateway-intents
     * @param {string} event The event name/intent string, lowercased, no underscores.
     * @param {Object} options Bot options.
     * @param {Number[]} list The current intents list.
     * @return {Number} the intent number.
     */
    parseIntentValue: (event, options, list) => {
        switch (event) {
            case 'guilds':
            case 'guildcreate':
            case 'guildupdate':
            case 'guilddelete':
            case 'guildrolecreate':
            case 'guildroleupdate':
            case 'guildroledelete':
            case 'channelcreate':
            case 'channelupdate':
            case 'channeldelete':
            case 'channelpinsupdate':
                return 1 << 0;
            case 'guildmembers':
            case 'guildmemberadd':
            case 'guildmemberupdate':
            case 'guildmemberremove':
                return 1 << 1;
            case 'guildbans':
            case 'guildbanadd':
            case 'guildbanremove':
                return 1 << 2;
            case 'guildemojis':
            case 'guildemojisupdate':
                return 1 << 3;
            case 'guildintegrations':
            case 'guildintegrationsupdate':
            case 'integrationcreate':
            case 'integrationupdate':
            case 'integrationdelete':
                return 1 << 4;
            case 'guildwebhooks':
            case 'webhooksupdate':
                return 1 << 5;
            case 'guildinvites':
            case 'invitecreate':
            case 'invitedelete':
                return 1 << 6;
            case 'guildvoicestates':
            case 'voicestateupdate':
                return 1 << 7;
            case 'guildpresences':
            case 'presenceupdate':
                return 1 << 8;
            case 'guildmessages':
                return 1 << 9;
            case 'messagecreate':
            case 'messageupdate':
            case 'messagedelete':
            case 'messagedeletebulk':
                if (options.dmsOnly)
                    return 1 << 12;
                else if (options.includeDMs) {
                    if (list.includes(1 << 9) && !list.includes(1 << 12)) return 1 << 12;
                    else if (!list.includes(1 << 9) && list.includes(1 << 12)) return 1 << 9;
                }
                return 1 << 9;
            case 'messagereactionadd':
            case 'messagereactionremove':
            case 'messagereactionremoveall':
            case 'messagereactionremoveemoji':
                if (options.dmsOnly)
                    return 1 << 13;
                else if (options.includeDMs) {
                    if (list.includes(1 << 10) && !list.includes(1 << 13)) return 1 << 13;
                    else if (!list.includes(1 << 10) && list.includes(1 << 13)) return 1 << 10;
                }
                return 1 << 10;
            case 'typingstart':
                if (options.dmsOnly)
                    return 1 << 14;
                else if (options.includeDMs) {
                    if (list.includes(1 << 11) && !list.includes(1 << 14)) return 1 << 14;
                    else if (!list.includes(1 << 11) && list.includes(1 << 14)) return 1 << 11;
                }
                return 1 << 11;
            case 'directmessages':
                return 1 << 12;
            case 'directmessagereactions':
                return 1 << 13;
            case 'directmessagetyping':
                return 1 << 14;
            default:
                return 0;
        }
    },

    /**
     * Auto-adjusts intents from the gateway events the bot listens to.
     * @param {Bot} bot The bot object.
     * @returns {Number} The intents number.
     */
    autoAdjustIntents: (bot) => {
        const intentList = [];
        
        for (const event of Object.keys(bot.opt).filter(x => x.startsWith('_event_listener_')).map(y => y.slice(16))) {
            const intent = module.exports.parseIntentValue(event, bot.opt, intentList);
            
            if (!intentList.includes(intent))
                intentList.push(intent);
        }
        
        if (bot.cmds.length) {
            if (bot.opt.dmsOnly && !intentList.includes(1 << 12)) {
                const index = intentList.indexOf(1 << 9);
                if (index > -1) intentList.splice(index, 1);
                intentList.push(1 << 12);
            } else if (bot.opt.includeDMs) {
                if (intentList.includes(1 << 9) && !intentList.includes(1 << 12)) intentList.push(1 << 12);
                else if (!intentList.includes(1 << 9) && intentList.includes(1 << 12)) intentList.push(1 << 9);
            } else if (!intentList.includes(1 << 9))
                intentList.push(1 << 9);
        }
        
        return intentList.reduce((a, b) => a | b, 0);
    },

    /**
     * Parses the intent parameter.
     * @param {Bot} bot The bot object.
     * @returns {number} the intent bitfield.
     */
    handleIntents: (bot) => {
        const params = bot.opt.intents || 1 << 9;
        
        if (typeof params === 'string') {
            if (params.toLowerCase() === 'auto') return module.exports.autoAdjustIntents(bot);
            params = [params];
        } else if (Number.isInteger(params)) return params;
        else if (!Array.isArray(params)) return 1 << 9;
        else if (params.every(n => Number.isInteger(n))) return Object.values(params).reduce((a, b) => a | b, 0);
        
        let bits = 0;
        for (const param of params)
            bits |= module.exports.parseIntentValue(param.replace(/[\_ ]/g, '').toLowerCase());
        return bits;
    },

    /**
     * No description.
     */
    evaluate: (msg, flag) => {
        if (!flag || typeof flag !== 'object') flag = {};
        if (!flag.binary) return JSON.parse(msg);
        const inflator = new Inflate();
        inflator.push(msg);
        if (inflator.err) throw new Error('An error occurred while decompressing data');
        return JSON.parse(inflator.toString());
    },

    /**
     * Creates a websocket handler based on the specified token.
     * @param {string} token The bot token.
     */
    setToken: (token) => {
        
        /**
         * @async
         * Function that is fired by default whenever the websocket gets a response.
         */
        module.exports.onWebsocketMessage = async (bot, data, flag) => {
            const msg = module.exports.evaluate(data, flag);
            if (msg.t) {
                const customListener = bot.opt[`_event_listener_${msg.t.toLowerCase().replace(/_/g, '')}`];
                if (customListener && (msg.t !== 'READY' || msg.t !== 'MESSAGE_CREATE')) await customListener(msg.d);
                else {
                    if (customListener) await customListener(msg.d);

                    switch (msg.t) {
                        case 'READY':
                            if (!msg.d.user.bot) throw new Error(`Please do NOT use this lib for userbotting/selfbotting. That's gross.`);
                            bot.emit('ready', bot);
                            bot.sessionID = msg.d.session_id;
                            bot.user = msg.d.user;
                            break;
                        case msg.t:
                            let Event = msg.t;
                            if(msg.d.author) {
                                 if(msg.d.author.bot) return; 
                                }
                        bot.emit(WSEvents[Event], msg.d);
                    }
                }
            }

            switch (msg.op) {
                case 7: // reconnect
                    return bot.socket.send(JSON.stringify({
                        op: 6,
                        d: {
                            token,
                            session_id: bot.sessionID,
                            seq: bot.seqNum
                        }
                    }));
                case 10: // heartbeat
                    if (bot.hb) clearInterval(bot.hb);
                    bot.hb = setInterval(() => {
                        return bot.socket.send(JSON.stringify({
                            op: 1,
                            d: bot.seqNum
                        }));
                    }, msg.d.heartbeat_interval);
            }
        };
    },

    /**
     * Function that is fired by default whenever the websocket closes.
     */
    onWebsocketClose: (bot, errCode) => {
        if (bot.hb) clearInterval(bot.hb);
        switch (errCode) {
            case 1000: // may have been closed manually, not discord's.
                return bot.close();
            case 4000:
                console.error('error: An unknown error has occurred causing the socket to close. Reconnecting.');
                break;
            case 4004:
                throw new Error('You sent an invalid token. Please use a valid bot token or regenerate your token if you think it\'s compromised.');
            case 4009:
                console.error('error: Session timed out. Reconnecting.');
                break;
            case 4012:
                throw new Error('Invalid gateway version.');
            case 4013:
                throw new Error('You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value.');
            case 4014:
                throw new Error('You sent a disallowed privileged intent. Please go to your bot page on discord.com/developers/applications and check your privileged intent manually.')
            default:
                console.error(`error: Websocket closed with the error code of ${errCode}. Reconnecting.`);
        }
        bot.close();
        bot.run();
    },
    
    /**
     * Check if the text is empty.
     * @param {string} text The text.
     * @returns {Boolean} if it is empty or not.
     */
    isEmpty: (text) => {
        if (!text.length) return true;
        return !text.replace(/[ \u0020\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u205F\u3000]/g, '').length;
    },
    
    /**
     * @async
     * Gets the command name based on the bot's prefix.
     * @param {string|string[]|function} prefixAttribute The prefix attribute from the client options.
     * @param {object} message The raw message object from discord.
     * @returns {string} The command name.
     */
    getCommandName: async (prefixAttribute, message) => {
        const content = message.content.split(' ')[0].toLowerCase();
        
        switch (typeof prefixAttribute) {
            case 'string':
                return content.startsWith(prefixAttribute) ? content.slice(prefixAttribute.length) : null;
            case 'object':
                if (!Array.isArray(prefixAttribute)) throw new TypeError(`prefix must be an array, not an object.`);

                for (const prefix of prefixAttribute)
                    if (content.startsWith(prefix))
                        return content.slice(prefix.length);
                break;
            case 'function':
                const prefix = await prefixAttribute(message);
                if (typeof prefix !== 'string') throw new Error('The function does not return a valid prefix.');
                return content.slice(prefix.length);
        }

        throw new TypeError(`Invalid prefix type: '${typeof prefixAttribute}'`);
    }
};