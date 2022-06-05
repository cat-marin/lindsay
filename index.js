#!/usr/bin/env node
const { Client, Intents } = require('discord.js');

// new bot instance
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
	console.log(`https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=0&scope=bot`);
	
});

bot.login(process.env.TOKEN);
