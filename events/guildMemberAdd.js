const joinmessages = require("../joinmessages.json");
const config = require("../config.json");
module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		var message = joinmessages.joinmessage[Math.floor(Math.random() * joinmessages.joinmessage.length)]
		var finalmessage = message.replace(/\$n/g, member.user.toString())
		finalmessage = finalmessage.replace(/\$p/g, member.displayName.toString())
		member.guild.channels.cache.get(config.joinmessagesChannelId).send(finalmessage)
		//member.guild.channels.cache.get(config.joinChannelID).send(`Be sure to use <#624069649469800513> for support, and read the required reading to be verified.`)
	},
};
