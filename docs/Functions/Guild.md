## Functions

<dl>
<dt><a href="#addRole">addRole(guild, user, role)</a></dt>
<dd><p>Adds a role to the user.</p>
</dd>
<dt><a href="#removeRole">removeRole(guild, user, role)</a></dt>
<dd><p>Removes the role from the user.</p>
</dd>
<dt><a href="#getGuild">getGuild(guild)</a></dt>
<dd><p>Gets the guild.</p>
</dd>
<dt><a href="#getChannels">getChannels(guild)</a></dt>
<dd><p>Gets the guild channels.</p>
</dd>
<dt><a href="#getGuildMember">getGuildMember(guild, member)</a></dt>
<dd><p>Gets the guild member.</p>
</dd>
<dt><a href="#listGuildMember">listGuildMember(guild, limit)</a></dt>
<dd><p>Lists guild members</p>
<p>Needs special intents.</p>
</dd>
<dt><a href="#searchGuildMember">searchGuildMember(guild, query, limit)</a></dt>
<dd><p>Searches guild member.</p>
</dd>
<dt><a href="#kickMember">kickMember(guild, user)</a></dt>
<dd><p>Kicks the member from the guild.</p>
</dd>
<dt><a href="#getBans">getBans(guild)</a></dt>
<dd><p>Gets ban list.</p>
</dd>
<dt><a href="#getBan">getBan(guild, user)</a></dt>
<dd><p>Gets the banned member.</p>
</dd>
<dt><a href="#banMember">banMember(guild, user, reason, deleteMessageDays)</a></dt>
<dd><p>Bans the member from the guild.</p>
</dd>
<dt><a href="#unbanMember">unbanMember(guild, user)</a></dt>
<dd><p>Unbans the member from the guild.</p>
</dd>
</dl>

<a name="addRole"></a>

## addRole(guild, user, role)
Adds a role to the user.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |
| role | <code>string</code> | The ID of the role. |

<a name="removeRole"></a>

## removeRole(guild, user, role)
Removes the role from the user.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |
| role | <code>string</code> | The ID of the role. |

<a name="getGuild"></a>

## getGuild(guild)
Gets the guild.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |

<a name="getChannels"></a>

## getChannels(guild)
Gets the guild channels.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |

<a name="getGuildMember"></a>

## getGuildMember(guild, member)
Gets the guild member.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| member | <code>string</code> | The ID of the member. |

<a name="listGuildMember"></a>

## listGuildMember(guild, limit)
Lists guild membersNeeds special intents.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| limit | <code>string</code> | The limit(1 - 1000). |

<a name="searchGuildMember"></a>

## searchGuildMember(guild, query, limit)
Searches guild member.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| query | <code>string</code> | The nickname/username to search. |
| limit | <code>string</code> | The limit. |

<a name="kickMember"></a>

## kickMember(guild, user)
Kicks the member from the guild.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |

<a name="getBans"></a>

## getBans(guild)
Gets ban list.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |

<a name="getBan"></a>

## getBan(guild, user)
Gets the banned member.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |

<a name="banMember"></a>

## banMember(guild, user, reason, deleteMessageDays)
Bans the member from the guild.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |
| reason | <code>string</code> | The reason. |
| deleteMessageDays | <code>string</code> | Number of days of messages to delete, must be between 0 and 7. |

<a name="unbanMember"></a>

## unbanMember(guild, user)
Unbans the member from the guild.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| guild | <code>string</code> | The ID of the guild. |
| user | <code>string</code> | The ID of the member. |

