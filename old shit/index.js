#!/usr/bin/env node

/*const Discord = require("discord.js")
const { InteractionResponseTypes } = require("discord.js/typings/enums")

require("dotenv").config()

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client
}

const guildId = "982766119700033546"

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return
    if (!InteractionResponseTypes.isGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommand.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")

    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply("You do not have sufficient permissions to use this command")

        slashcmd.run(client, interaction)
})

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`)
    const guild = client.guilds.cache.get(guildId)
    if (!guild)
    console.error("Target guild nto found")

    await guild.commands.set([...client.slashcommands.values()])
    console.log(`Successfully loaded in ${client.slashcommands.size}`)
   
})

client.login(process.env.TOKEN)
*/

