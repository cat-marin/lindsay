#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId } = require('./config.json');
const { token } = require('./token.json');

const commands = [];
const modulePath = path.join(__dirname, 'modules');
const moduleFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'));

for (const file of moduleFiles) {
	const filePath = path.join(modulePath, file);
	const module = require(filePath);
	commands.push(module.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
