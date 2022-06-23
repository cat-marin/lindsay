const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('source')
		.setDescription("Command to link Lindsay's source code."),
	async execute(interaction) {
		try {
			interaction.reply("https://github.com/cat-marin/lindsay");
		} catch (err) {
			interaction.reply("An error occurred.");
			console.log(err);
		}
	},
};
