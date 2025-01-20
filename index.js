import { Client, Events, GatewayIntentBits } from 'discord.js';

// Check that REACTION_ID and USER_ID are not undefined
const emojiId = process.env.REACTION_ID;
if (emojiId == undefined) {throw Error('env.REACTION_ID is undefined');}
const userId = process.env.USER_ID;
if (emojiId == undefined) {throw Error('env.USER_ID is undefined');}

// Create Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

// Event triggers when bot is ready
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.username}`);
});

// eslint-disable-next-line no-unused-vars
client.on(Events.MessageReactionAdd, async (messageReaction, user, _details) => {

    // Check that emoji and user id match the select users
    if (messageReaction.emoji.id == emojiId && user.id == userId) {
        await messageReaction.message.delete();
    }
});

client.login(process.env.DISCORD_TOKEN);