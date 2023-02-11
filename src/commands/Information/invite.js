const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "invite",
    category: "Information",
    aliases: [ "addme","vote" ],
    description: "invite Wendyyyyy",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
    const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("Invite me ")
    .setStyle("LINK")
    .setEmoji("🤖")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2453007697&scope=applications.commands%20bot`),
    new MessageButton()
    .setEmoji('✉️')
    .setLabel("vote")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/724135554966355968/vote"),
    new MessageButton()
    .setLabel("Support")
    .setStyle("LINK")
    .setEmoji('🏠')
    .setURL("https://discord.gg/6yRpW7e3dS")
			);

          const mainPage = new MessageEmbed()
            .setAuthor({ name: ' Wendyyy  ପ(๑•ᴗ•๑)ଓ ♡', iconURL: client.user.avatarURL()})
           // .setThumbnail('https://media.discordapp.net/attachments/876035356460462090/888434725235097610/20210820_124325.png')
            .setColor('#29cddc')
            .setFooter({
            text:`Requested By: ${message.author.username} | Wendy <3 U`,
            iconRUL:message.author.displayAvatarURL()
             } )
            .addField('All of  my  links are listed below,click  the buttons to redirect ', `\u200B`, true)
           message.reply({embeds: [mainPage], components: [row]})
    }
}
