const { MessageEmbed } = require("discord.js");
const { Player } = require("erela.js");
    /**
     * 
     * @param {Player} player 
     * @param {String} oldChannel
     * @param {String} newChannel
     */
module.exports = async (client, player, oldChannel, newChannel) => {
      const guild = client.guilds.cache.get(player.guild)
      if(!guild) return;
      const channel = guild.channels.cache.get(player.textChannel);
        if(oldChannel === newChannel) return;
        if(newChannel === null || !newChannel) {
        if(!player) return;
        if(channel) await  channel.send({ embeds: [new MessageEmbed().setDescription(`Music stopped. I've been disconnected from <#${oldChannel}>`).setColor(`#ee1616`).setTitle(`__Disconnected__`).setTimestamp()]})
         return player.destroy();
      } else {
        player.voiceChannel = newChannel;
        
        //
        if(channel) await channel.send({embeds: [new MessageEmbed().setTitle(`__Paused__`).setDescription(`My voice channel  has now moved to <#${player.voiceChannel}>`)]});
        if(player.paused) player.pause(false);
      }

}
