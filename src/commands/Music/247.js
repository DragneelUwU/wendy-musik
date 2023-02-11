const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "247",
  aliases: ["24", "24/7"],
  category: "Music",
  description: "24/7  connection in voice channel",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  //enabled:false,
  execute: async (message, args, client, prefix) => {


    const player = message.client.manager.players.get(message.guild.id);
    if (player.twentyFourSeven) {
      player.twentyFourSeven = false;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setTimestamp()
       .setDescription(`__24/7__ mode is now \`disabled\`.`)
      return message.reply({embeds: [embed]});
    }
    else {
      player.twentyFourSeven = true;
      const embed = new MessageEmbed()
       .setColor(client.embedColor)
       .setTimestamp()
       .setDescription(`__24/7__ mode is now \`enabled\`.`)
      
      return message.reply({embeds: [embed]});
    }
  }
};