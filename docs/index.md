<a name="Bot"></a>

## Bot
**Kind**: global class  

* [Bot](#Bot)
    * [new Bot([options])](#new_Bot_new)
    * [.error(callback)](#Bot+error) ⇒ <code>this</code>
    * [.setStatus(type)](#Bot+setStatus) ⇒ <code>void</code>
    * [.setActivity(game, type)](#Bot+setActivity)
    * [.getPresenceObject()](#Bot+getPresenceObject) ⇒ <code>Object</code>
    * [.setToken(token)](#Bot+setToken)
    * [.run()](#Bot+run) ⇒ <code>void</code>
    * [.loadCommands(Folder)](#Bot+loadCommands)
    * [.close(closeProcess)](#Bot+close) ⇒ <code>void</code>

<a name="new_Bot_new"></a>

### new Bot([options])
The main bot object. This is where it all began, folks.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>BotOptions</code> | <code>{}</code> | The options for the bot. |

<a name="Bot+error"></a>

### bot.error(callback) ⇒ <code>this</code>
Explicitly assigns a custom function whenever the client receives an Error (globally)

**Kind**: instance method of [<code>Bot</code>](#Bot)  
**Returns**: <code>this</code> - The bot object.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback function |

<a name="Bot+setStatus"></a>

### bot.setStatus(type) ⇒ <code>void</code>
Sets the status to discord.

**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The status type. This could be online, idle, dnd, or invisible. |

<a name="Bot+setActivity"></a>

### bot.setActivity(game, type)
Sets the activity

**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| game | <code>string</code> | Activity being played. |
| type | <code>string</code> | Type of the activity. |

<a name="Bot+getPresenceObject"></a>

### bot.getPresenceObject() ⇒ <code>Object</code>
Gets the presence object.

**Kind**: instance method of [<code>Bot</code>](#Bot)  
**Returns**: <code>Object</code> - The presence object.  
<a name="Bot+setToken"></a>

### bot.setToken(token)
Sets the token for the client and modifies the client's attributes.

**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token for the client. |

<a name="Bot+run"></a>

### bot.run() ⇒ <code>void</code>
Runs the bot and initiates the websocket.

**Kind**: instance method of [<code>Bot</code>](#Bot)  
<a name="Bot+loadCommands"></a>

### bot.loadCommands(Folder)
Loads the commands

**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| Folder | <code>string</code> | The folder to load commands from. |

<a name="Bot+close"></a>

### bot.close(closeProcess) ⇒ <code>void</code>
Closes the bot.

**Kind**: instance method of [<code>Bot</code>](#Bot)  

| Param | Type | Description |
| --- | --- | --- |
| closeProcess | <code>boolean</code> | close the process too or not. defaults to false. |

