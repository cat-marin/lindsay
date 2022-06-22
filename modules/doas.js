const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('doas')
		.setDescription('Moderation command')
		.addStringOption((option) =>
			option
			 .setName("action")
			 .setDescription("The action you're taking.")
			 .setRequired(true)
		),
	async execute(interaction) {
		interaction.reply({
			content: interaction.options.getString("action"),
			ephemeral: true,
		});
	},
};
