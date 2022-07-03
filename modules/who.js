const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { security, embeds } = require('../config.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('who')
		.setDescription("Moderation command -- display important information about a user.")
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription('user')
				.setRequired(true)),
	execute(interaction) {
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) return interaction.reply({ content:`${security.permDeniedMessage}`, ephemeral: true });
		const user = interaction.options.getUser('user');
		const daysSinceCreation = Math.floor((Date.now() - user.createdAt) / (1000*60*60*24));
		const infoEmbed = new MessageEmbed()
			.setColor(`${embeds.color}`)
			.setTitle(`${user.tag}`)
			.setThumbnail(user.displayAvatarURL({ dynamic: false }))
			.setDescription(`<@${user.id}>`)
			.addFields(
				{ name: 'ID', value: `${user.id}` },
				{ name: 'Account Created', value: `${user.createdAt.toLocaleString()}` },
				{ name: 'Days Since Account Creation', value: `${daysSinceCreation}`}
			);

		interaction.reply({
			embeds: [infoEmbed],
			ephemeral: true
		});

	},
};
