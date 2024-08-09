require('dotenv').config(); // Load .env file

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Required to access guild events
        GatewayIntentBits.GuildScheduledEvents // Ensure this is included
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildScheduledEventCreate', event => {
    console.log(`New Event Created: ${event.name}`);

    console.log(`- Description: ${event.description || 'No description'}`);
    console.log(`- Start Time: ${event.scheduledStartAt}`);
    console.log(`- End Time: ${event.scheduledEndAt || 'No end time'}`);
    console.log(`- Event URL: ${event.url}`);
});

client.on('guildScheduledEventUpdate', (oldEvent, newEvent) => {
    console.log(`Event Updated: ${oldEvent.name}`);
    

    // Compare and log changes
    if (oldEvent.name !== newEvent.name) {
        console.log(`- Name changed from ${oldEvent.name} to ${newEvent.name}`);
    }

    if (oldEvent.description !== newEvent.description) {
        console.log(`- Description changed from ${oldEvent.description || 'No description'} to ${newEvent.description || 'No description'}`);
    }

    if (oldEvent.scheduledStartAt !== newEvent.scheduledStartAt) {
        console.log(`- Start time changed from ${oldEvent.scheduledStartAt} to ${newEvent.scheduledStartAt}`);
    }

    if (oldEvent.scheduledEndAt !== newEvent.scheduledEndAt) {
        console.log(`- End time changed from ${oldEvent.scheduledEndAt || 'No end time'} to ${newEvent.scheduledEndAt || 'No end time'}`);
    }

    if (oldEvent.url !== newEvent.url) {
        console.log(`- Event URL changed from ${oldEvent.url} to ${newEvent.url}`);
    }
});


client.login(process.env.DISCORD_BOT_TOKEN);
