// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const fs = require("fs");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require("dotenv").config()

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

eval(fs.readFileSync('deployCommands.js')+'');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

    switch(commandName) {
        case 'ping':
            await interaction.reply('Pong!');
        default:
            await interaction.reply("Supply a command!")
    };
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);