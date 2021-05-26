const ws = require('ws');
const { platform } = require('os');
const { EventEmitter } = require('events');
const util = require('./util');
const { readdirSync } = require('fs');
const { default: Collection } = require('@discordjs/collection');
class Bot extends EventEmitter {
    /**
     * The main bot object. This is where it all began, folks.
     * @param {BotOptions} [options={}] The options for the bot.
     */
    constructor(options = {}) {
        super()
        if (!(options instanceof Object)) throw new TypeError("'options' must be an object.");
        this.opt = Object.assign({
            intents: 'auto'
        }, options);
        this.socket = null;
        this.user = null;
        this.seqNum = 1;
        this.sessionID = null;
        this.waits = {};

        this.setToken(this.opt.token);
        this.users = new Collection();
        this.guilds = new Collection();
        this.channels = new Collection();
    }
    
    /**
     * Explicitly assigns a custom function whenever the client receives an Error (globally)
     * @param {Function} callback The callback function
     * @returns {this} The bot object.
     */
    error(callback) {
        if (typeof callback !== 'function') throw new TypeError("'callback' must be a function.");
        this.opt.onError = callback;
        return this;
    }

    /**
     * Sets the status to discord.
     * @param {string} type The status type. This could be online, idle, dnd, or invisible.
     * @returns {void}
     */
    setStatus(type) {
        if (typeof type !== 'string' || !['online', 'idle', 'dnd', 'invisible'].includes(type.toLowerCase())) throw new TypeError('Invalid status type');
        
        this.socket.send(JSON.stringify({
            op: 3,
            d: {
                status: type.toLowerCase(),
                afk: false,
                since: type.toLowerCase() === 'idle' ? Date.now() : null,
                game: null,
            }
        }));
    }
    /**
     * Sets the activity
     * @param {string} game Activity being played.
     * @param {string} type Type of the activity.
     */
    setActivity(game, type) {
        this.socket.send(JSON.stringify({
            op: 3,
            d: {
                activities: [{
                    name: game,
                    type: type || 0
                }],
                status: this.opt.status,
                since: this.opt.status === 'idle' ? Date.now() : null,
                afk: false
            }
        }));
    }
    /**
     * Gets the presence object.
     * @returns {Object} The presence object.
     */
    getPresenceObject() {
        const presenceObject = { 
            status: (typeof this.opt.status === 'string' && ['online', 'idle', 'dnd', 'invisible'].includes(this.opt.status.toLowerCase())) ? this.opt.status.toLowerCase() : 'online'
        };
        if (this.opt.activities || this.opt.activityName || this.opt.activityType) {
            presenceObject.activities = this.opt.activities || [{
                name: this.opt.activityName || 'Bot made using discord-bot-lib',
                type: this.opt.activityType || 0
            }];
        }
        
        if (presenceObject.status === 'idle')
            presenceObject.since = Date.now();
        
        return presenceObject;
    }

    /**
     * Sets the token for the client and modifies the client's attributes.
     * @param {string} token The token for the client.
     */
    setToken(token) {
        if (!token || typeof token !== 'string') throw new Error(`The bot is missing a token.`);

        util.setToken(token);

        /**
         * Runs the bot and initiates the websocket.
         * @returns {void}
         */
        this.run = () => {
            if (typeof token !== 'string') throw new TypeError('Missing a valid token in the opt attribute.');
            else if (this.socket) throw new TypeError('A websocket attribute is already running.');

            this.socket = new ws(this.opt.websocketAddress || `wss://gateway.discord.gg/?v=${this.opt.websocketVersion || 8}&encoding=json`);
            this.socket.once('open', () => {
                this.socket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token,
                        intents: util.handleIntents(this),
                        properties: this.opt.websocketProperties || {
                            $os: platform,
                            $browser: 'Mobile',
                            $device: 'Android'
                        },
                        presence: this.getPresenceObject()
                    }
                }));

                process
                  .on('SIGINT', () => this.close(true))
                  .on('SIGTERM', () => this.close(true));

                this.socket
                  .on('error', this.opt.onWebsocketError || (() => undefined))
                  .on('message', (msg, flag) => (this.opt.onWebsocketMessage || util.onWebsocketMessage)(this, msg, flag))
                  .on('close', errCode => (this.opt.onWebsocketClose || util.onWebsocketClose)(this, errCode));
            });
        };
    }

    /**
     * Closes the bot.
     * @param {boolean} closeProcess close the process too or not. defaults to false.
     * @returns {void}
     */
    close(closeProcess) {
        this.socket.close();
        this.socket = null;
        
        if (closeProcess === true) process.exit();
    }
}
for (const file of readdirSync(`${__dirname}/functions/`).filter(f => f.endsWith('.js'))) {
    try {
      const fn = require(`./functions/${file}`);

      Object.assign(Bot.prototype, fn);
    } catch (err) {
      console.error(`Function ${file.slice(0, -3)} failed to load, error:\n${err}\nYou may need to upgrade to Node 14^.`);
    }
  }

module.exports = Bot;