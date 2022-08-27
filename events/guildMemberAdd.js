const joinmessages = require("../joinmessages.json");
const config = require("../config.json");
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member, client) {
		if (!config.joinmessages.enable) return;
		var message = joinmessages.joinmessage[Math.floor(Math.random() * joinmessages.joinmessage.length)]
		var finalmessage = message.replace(/\$n/g, member.user.toString())
		finalmessage = finalmessage.replace(/\$p/g, member.displayName.toString())
		let daysSinceCreation = Math.floor((Date.now() - member.user.createdAt) / (1000*60*60*24));
		
		const joinEmbed = new MessageEmbed()
		        .setColor(`${config.embeds.color}`)
		        .setTitle(`${member.user.tag} joined the server!`)
		        .setDescription(`${finalmessage}`)
			.setThumbnail(member.displayAvatarURL({ dynamic: false }))
			.addFields(
				{ name: 'Account Created', value: `${member.user.createdAt.toLocaleString()}` },
				{ name: 'Days Since Account Creation', value: `${daysSinceCreation}` },
			);
			if(config.joinmessages.enableFooter) {
			joinEmbed.setFooter({ text: `${config.joinmessages.footerContent}` });
			}
	
		member.guild.channels.cache.get(config.joinmessages.channelId).send({ embeds: [joinEmbed] });
		if(!config.joinmessages.enableDirectMessage) return;
		member.send(config.joinmessages.dmContent)
			.catch(() => member.guild.channels.cache.get(config.joinmessages.channelId).send(`<@${member.id}> ${config.joinmessages.dmContent}`));
	},
};
