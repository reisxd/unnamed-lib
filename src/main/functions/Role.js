const flags = [
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'ADMINISTRATOR',
  'MANAGE_CHANNELS',
  'MANAGE_GUILD',
  'ADD_REACTIONS',
  'VIEW_AUDIT_LOG',
  'PRIORITY_SPEAKER',
  'STREAM',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'VIEW_GUILD_INSIGHTS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEFEAN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS',
  'USE_SLASH_COMMANDS',
  'REQUEST_TO_SPEAK',
  'MANAGE_THREADS',
  'USE_PUBLIC_THREADS',
  'USE_PRIVATE_THREADS'
].reduce((t, c, i) => (t[c] = 1n << BigInt(i), t), {});

function resolve(bit = 0n) {
  if (typeof bit === 'bigint' && bit >= 0n) return bit;
  if (Array.isArray(bit)) return bit.map(resolve).reduce((t, c) => t | c, 0n);
  if (typeof bit === 'string' && typeof flags[bit] !== 'undefined') return flags[bit];
  throw new TypeError(`Invalid bitfield: ${bit}`);
}

function has(bit, main) {
  if (Array.isArray(bit)) return bit.map(c => has(c, main));
  bit = resolve(bit);
  return (resolve(main) & bit) === bit;
}

function getReadablePerms(bitfield) {
  return Object.keys(flags).filter(flag => has(flag, bitfield));
}

async function hasPermissions(guild, member, ...permissions) {
  guild = guild?.id ?? guild;
  member = member?.id ?? member;
  const g = ((await this.guilds.get(guild)) || (await this.getGuild(guild)));
  const guildRoles = g.roles;
  const memberRoles = await this.getGuildMember(guild, member).then(m => m.roles);
  const perms = getReadablePerms(guildRoles.filter(r => memberRoles.includes(r.id)).map(r => BigInt(r.permissions)));
  
  return g.ownerID === member || perms.includes('ADMINISTRATOR') ? new Array(permissions.length).fill(true) : has(permissions, perms);
}


module.exports = {
    resolve,
    has,
    getReadablePerms,
    hasPermissions
}