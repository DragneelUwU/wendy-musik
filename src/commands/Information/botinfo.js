const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
require("dotenv").config();
const moment = require("moment")

require("moment-duration-format")

module.exports = {
    name: "botinfo",
    category: "Information",
    aliases: ["wendy"  ],
    description: "Shows the bot info",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, id,prefix,) => {
      const pre = process.env.prefix
     
    const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    // 
    new MessageButton()
    .setLabel("Vote")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/724135554966355968/vote")
			);
      const duration = moment.duration(client.uptime).format("D [days],H [hrs], m[mins], s[]secs")

      const mainPage = new MessageEmbed()
            .setAuthor({ name: "Wendy's Info", iconURL:client.user.avatarURL()})
            .setThumbnail('http://images6.fanpop.com/image/photos/36500000/Fairy-Tail-image-fairy-tail-36595461-160-195.png')
            .setColor('#29cddc')
            .setDescription(
              `Konichiwa | hello | namaste am <@724135554966355968>, a discord music bot in beta  ,am pretty descent with support of Youtube <a:ayoutube:919582561783668776> and spotify <:spotify:919582094391398430> and Soundcloud <:souncloud:919756799303888956> :), looking forward to grow with everyone cause i am short xD  \n
           
              `)
              .addField(`<:developer:919584435186331658> Developer`,`\`\`\`yml\nDragneel#1255\`\`\``,true)  

              .addField(`<:shards:951577202959478864> Shard`,`\`\`\`yml\n${id}\`\`\``,true)

              .addField( `<:info:919584891631448115> INFO`,`\`\`\`yml\nPrefix: ${pre} \nTotal Commands: ${client.commands.size} \nUsers: ${
                client.users.cache.size
              } \nServers: ${client.guilds.cache.size} \nChannels: ${
                client.channels.cache.size
              }\`\`\``,true
            )
        return message.reply({embeds: [mainPage], components: [row]});
    }
}
