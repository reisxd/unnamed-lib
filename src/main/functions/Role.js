const flags = [
    'CREATE\_INSTANT\_INVITE',
    'KICK\_MEMBERS',
    'BAN\_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE\_CHANNELS',
    'MANAGE\_GUILD',
    'ADD\_REACTIONS',
    'VIEW\_AUDIT\_LOG',
    'PRIORITY\_SPEAKER',
    'STREAM',
    'VIEW\_CHANNEL',
    'SEND\_MESSAGES',
    'SEND\_TTS\_MESSAGES',
    'MANAGE\_MESSAGES',
    'EMBED\_LINKS',
    'ATTACH\_FILES',
    'READ\_MESSAGE\_HISTORY',
    'MENTION\_EVERYONE',
    'USE\_EXTERNAL\_EMOJIS',
    'VIEW\_GUILD\_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE\_MEMBERS',
    'DEFEAN\_MEMBERS',
    'MOVE\_MEMBERS',
    'USE\_VAD',
    'CHANGE\_NICKNAME',
    'MANAGE\_NICKNAMES',
    'MANAGE\_ROLES',
    'MANAGE\_WEBHOOKS',
    'MANAGE\_EMOJIS',
    'USE\_SLASH\_COMMANDS',
    'REQUEST\_TO\_SPEAK',
    'MANAGE\_THREADS',
    'USE\_PUBLIC\_THREADS',
    'USE\_PRIVATE\_THREADS'
  ].reduce((t, c, i) => (t[c] = 1 << i, t), {});
  
  function resolve(bit = 0) {
    if (typeof bit === 'number' && bit >= 0) return bit;
    if (Array.isArray(bit)) return bit.map(resolve).reduce((t, c) => t | c, 0);
    if (typeof bit === 'string' && typeof flags[bit] !== 'undefined') return flags[bit];
    throw new TypeError('Invalid bitfield');
  }
  
  function has(bit, main) {
    if (Array.isArray(bit)) return bit.map(c => has(c, main));
    bit = resolve(bit);
    return (main & bit) === bit;
  }
  
  function getReadablePerms(bitfield) {
    return Object.keys(flags).filter(flag => has(flag, bitfield));
  }

module.exports = {
    resolve,
    has,
    getReadablePerms
}