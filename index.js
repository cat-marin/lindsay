#!/usr/bin/env node
// written by cat
const { Client, Collection, Intents } = require('discord.js');
const { bot } = require ('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// new client instance + intents
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS
	] 
});


// command handling start
client.commands = new Collection();

const commands = [];
const modulePath = path.join(__dirname, 'modules');
const moduleFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'));

for (const file of moduleFiles) {
	const filePath = path.join(modulePath, file);
	const module = require(filePath);
	commands.push(module.data.toJSON());
	client.commands.set(module.data.name, module);
}
// command handling end

// event handling start
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, commands));
	} else {
		client.on(event.name, (...args) => event.execute(...args, commands));
	}
}
// event handling end

client.on("error", console.error);

client.login(bot.token);
