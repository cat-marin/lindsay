const { SlashCommandBuilder } = require('@discordjs/builders');
const { verify } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verification command.'),
	async execute(interaction) {
		var author = interaction.user.id;
		try {
			const role = verify.roleId;
			await interaction.member.roles.add(role);
			await interaction.reply("You've been verified!");
		} catch (err) {
			console.error(err)
		}
	},
};
