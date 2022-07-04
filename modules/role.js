const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { role, embeds } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Role command.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('list')
				.setDescription('Lists available roles'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Adds a role. Role names are cAsE sEnSiTiVe.')
				.addStringOption(option =>
					option
						.setName('role')
						.setDescription('The role to be added.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
		        subcommand
		                .setName('remove')
		                .setDescription('Removes a role. Role names are cAsE sEnSiTiVe.')
		                .addStringOption(option =>
		                        option
		                                .setName('role')
		                                .setDescription('The role to be removed.')
		                                .setRequired(true))),
		execute(interaction) {
			const arg = interaction.options.getSubcommand();
			const roleName = interaction.options.getString('role');
			const roleId = interaction.guild.roles.cache.find(r => r.name === `${roleName}`);
			let items = "";
			var num = 1;
			switch(arg) {
				case 'list':
					const listEmbed = new MessageEmbed()
						.setColor(embeds.color)
						.setTitle('Roles');
					Object.keys(role).slice(1).forEach(function(key){
						items = items + `\n${num}. ${key}`;
						num++;
						listEmbed.setDescription(items);
					});
					return interaction.reply({ embeds: [ listEmbed ] });
					break;
				case 'add':
					if(interaction.member.roles.cache.find(r => r.name === `${roleName}`)) return interaction.reply("You already have that role.");
					if(!Object.keys(role).slice(1).includes(roleName)) return interaction.reply("That role is not self-assignable or does not exist (role names are cAsE sEnSiTiVe).");
					interaction.member.roles.add(roleId).catch(console.error);
					interaction.reply(`You were given the ${roleName} role!`);
					break;
				case 'remove':
					if(!interaction.member.roles.cache.find(r => r.name === `${roleName}`)) return interaction.reply("You don't have that role.");
					if(!Object.keys(role).slice(1).includes(roleName)) return interaction.reply("That role is not self-assignable.");
					interaction.member.roles.remove(roleId).catch(console.error);
					interaction.reply(`You no longer have the ${roleName} role!`);
					break;
				default:
					return interaction.reply("You must supply an action (add/remove)");
			}
		},
};
