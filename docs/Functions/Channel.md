## Functions

<dl>
<dt><a href="#sendMessage">sendMessage(channel, message)</a></dt>
<dd><p>Sends a message.</p>
</dd>
<dt><a href="#deleteMessage">deleteMessage(channel, message)</a></dt>
<dd><p>Deletes message.</p>
</dd>
<dt><a href="#editMessage">editMessage(channel, message, messageId)</a></dt>
<dd><p>Unpins a message.</p>
</dd>
<dt><a href="#addReaction">addReaction(channel, message, emoji)</a></dt>
<dd><p>Adds a reaction to the message.</p>
</dd>
<dt><a href="#removeReaction">removeReaction(channel, message, emoji)</a></dt>
<dd><p>Removes reaction from the client.</p>
</dd>
<dt><a href="#getChannel">getChannel(channel)</a></dt>
<dd><p>Gets channel.</p>
</dd>
<dt><a href="#deleteChannel">deleteChannel(channel)</a></dt>
<dd><p>Deletes a channel.</p>
</dd>
<dt><a href="#getMessage">getMessage(channel, message)</a></dt>
<dd><p>Gets a message from a channel.</p>
</dd>
<dt><a href="#removeReactionFromUser">removeReactionFromUser(channel, message, emoji, user)</a></dt>
<dd><p>Removes the reaction from a user.</p>
</dd>
<dt><a href="#getReaction">getReaction(channel, message, emoji)</a></dt>
<dd><p>Gets a reaction.</p>
</dd>
<dt><a href="#removeAllReaction">removeAllReaction(channel, message)</a></dt>
<dd><p>Removes all of the reactions from a message.</p>
</dd>
<dt><a href="#bulkDeleteMessage">bulkDeleteMessage(channel, number)</a></dt>
<dd><p>Bulk deletes messages.</p>
</dd>
<dt><a href="#getChannelInvites">getChannelInvites(channel)</a></dt>
<dd><p>Gets channel invites.</p>
</dd>
<dt><a href="#createChannelInvite">createChannelInvite(channel)</a></dt>
<dd><p>Creates a channel invite.</p>
</dd>
<dt><a href="#startTyping">startTyping(channel)</a></dt>
<dd><p>Triggers typing event.</p>
</dd>
<dt><a href="#getPinnedMessages">getPinnedMessages(channel)</a></dt>
<dd><p>Shows pinned messages</p>
</dd>
<dt><a href="#pinMessage">pinMessage(channel, message)</a></dt>
<dd><p>Pins a message.</p>
</dd>
<dt><a href="#unpinMessage">unpinMessage(channel, message)</a></dt>
<dd><p>Unpins a message.</p>
</dd>
</dl>

<a name="sendMessage"></a>

## sendMessage(channel, message)
Sends a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

<a name="deleteMessage"></a>

## deleteMessage(channel, message)
Deletes message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

<a name="editMessage"></a>

## editMessage(channel, message, messageId)
Unpins a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The message content(or embed). |
| messageId | <code>string</code> | The ID of the message. |

<a name="addReaction"></a>

## addReaction(channel, message, emoji)
Adds a reaction to the message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |
| emoji | <code>string</code> | The emoji. |

<a name="removeReaction"></a>

## removeReaction(channel, message, emoji)
Removes reaction from the client.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |
| emoji | <code>string</code> | The emoji. |

<a name="getChannel"></a>

## getChannel(channel)
Gets channel.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="deleteChannel"></a>

## deleteChannel(channel)
Deletes a channel.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="getMessage"></a>

## getMessage(channel, message)
Gets a message from a channel.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

<a name="removeReactionFromUser"></a>

## removeReactionFromUser(channel, message, emoji, user)
Removes the reaction from a user.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |
| emoji | <code>string</code> | The emoji. |
| user | <code>string</code> | The ID of the user. |

<a name="getReaction"></a>

## getReaction(channel, message, emoji)
Gets a reaction.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |
| emoji | <code>string</code> | The emoji. |

<a name="removeAllReaction"></a>

## removeAllReaction(channel, message)
Removes all of the reactions from a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

<a name="bulkDeleteMessage"></a>

## bulkDeleteMessage(channel, number)
Bulk deletes messages.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| number | <code>string</code> | How many messages will get deleted(2 - 100). |

<a name="getChannelInvites"></a>

## getChannelInvites(channel)
Gets channel invites.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="createChannelInvite"></a>

## createChannelInvite(channel)
Creates a channel invite.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="startTyping"></a>

## startTyping(channel)
Triggers typing event.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="getPinnedMessages"></a>

## getPinnedMessages(channel)
Shows pinned messages

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |

<a name="pinMessage"></a>

## pinMessage(channel, message)
Pins a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

<a name="unpinMessage"></a>

## unpinMessage(channel, message)
Unpins a message.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| channel | <code>string</code> | The ID of the channel. |
| message | <code>string</code> | The ID of the message. |

