const joinmessages = require("../joinmessages.json");
const config = require("../config.json");
module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		if (!config.joinmessages.enable) return;
		var message = joinmessages.joinmessage[Math.floor(Math.random() * joinmessages.joinmessage.length)]
		var finalmessage = message.replace(/\$n/g, member.user.toString())
		finalmessage = finalmessage.replace(/\$p/g, member.displayName.toString())
		member.guild.channels.cache.get(config.joinmessages.channelId).send(finalmessage)
	},
};
