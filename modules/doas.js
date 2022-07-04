const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { security } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('doas')
		.setDescription('Mod actions command')
		.addSubcommand(subcommand =>
			subcommand
				.setName('clear')
				.setDescription('Moderation command -- clear up to 100 messages at a time (capped due to API limitations).')
				.addIntegerOption(option =>
					option
						.setName('messages')
						.setDescription('Amount of messages to be deleted')
						.setRequired(true))),
	execute(interaction) {
		if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MEMBERS)) return interaction.reply({ content:`${security.permDeniedMessage}`, ephemeral: true });
		const arg = interaction.options.getSubcommand();
		const clearNum = interaction.options.getInteger('messages');
		if(!clearNum) return interaction.reply({ content:`Message count cannot be zero.`, ephemeral: true });
		switch(arg) {
			case 'clear':
				if(clearNum > 100) return interaction.reply({ content: "Message count cannot be greater than 100 due to API limitations", ephemeral: true });
				interaction.channel.bulkDelete(clearNum, true);
				interaction.reply({
					content: `Deleted ${clearNum} messages.`,
					ephemeral: true
				});
				break;
			default:
				interaction.reply({
					content: 'No arg provided',
					ephemeral: true
				});
				break;
		}
	},
};
