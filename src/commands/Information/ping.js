const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Check Ping Bot",
    args: false,
    aliases:['Pong'],
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {

      let pingEmbed = new MessageEmbed()
     .setDescription("Looks like the bot is slow.xD")
     .setColor("#29cddc")
      
  await message.reply({ embeds:[pingEmbed] }).then(async (msg) => {
  const ping = msg.createdAt - message.createdAt;
  const api_ping = client.ws.ping;

  const PingEmbed = new MessageEmbed()
    .setAuthor({ name: "Pong ping", iconURL: client.user.displayAvatarURL()})
    .setColor(client.embedColor)
    .addField("<a:latency:898147640573833269> Latency", `\`\`\`yml\n |${ping}ms|\n\`\`\``, true)
    .addField("<a:KAWAII:747082492770517072> Mah Heart | API", `\`\`\`yml\n|${api_ping}ms|\n\`\`\``, true)
    .setFooter({ text: `Requested by ${message.author.username}`, iconURL:  message.author.avatarURL({ dynamic: true })})
    .setTimestamp();

  await msg.edit({
    content: "\`Babe\`",
    embeds: [PingEmbed]
  })
 })
 }
}