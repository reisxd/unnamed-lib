# unnamed-lib
A Discord library written in JavaScript

Example:
```
const Bot = require('unnamed-lib');
const bot = new Bot({
    token: "Token",
    intents: 4608
});
bot.on('message', (message) => {
    const args = message.content.slice('!'.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    if(command === 'ping') return bot.sendMessage('pong!', message.channel_id);
});


bot.run();
```