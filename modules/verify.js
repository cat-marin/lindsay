const { SlashCommandBuilder } = require('@discordjs/builders');
const { verify } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Verification command.'),
	async execute(interaction) {
		const role = verify.roleId;
		if(interaction.member.roles.cache.has(role)) return interaction.reply("You've already been verified.");
		try {
			await interaction.member.roles.add(role);
			await interaction.reply("You've been verified!");
		} catch (err) {
			console.error(err)
		}
	},
};
