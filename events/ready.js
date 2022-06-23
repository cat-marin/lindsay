const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { bot } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client, commands) {
		console.log(`Logged in as ${client.user.tag}!`);
		client.user.setPresence({activities: [{ name: `${bot.activity}` }], status: 'online' });
		console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
		// command reload start
		client.commands.set([]);
		const CLIENT_ID = client.user.id;
		const rest = new REST({
			version: "9",
		}).setToken(bot.token);

		(async () => {
			try {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands,
				});
				console.log("Reloaded commands!");
			} catch (err) {
				if (err) console.error(err);
			}
		})();
	},
};
