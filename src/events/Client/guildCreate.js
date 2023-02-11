const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: "guildCreate",
run: async (client, guild) => {
  
  const channel = client.channels.cache.get(`${client.config.guildJoins}`);
  let own = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setAuthor({
      name:` Yuuuhuuu New Home !!`,
      iconURL:client.user.displayAvatarURL()
    })
    .setImage('https://cdn.discordapp.com/attachments/958470874200154173/958470914490638346/wendyanimated.gif')
    .addField('<a:discord:719407676760653905> Name', `\`${guild.name}\``,true)
    .addField('<a:discord:719407676760653905> ID', `\`${guild.id}\``,true)
    .addField('<a:discord:719407676760653905> Owner', `\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} \n${own.id}\``)
    .addField('<a:starr:719407789117538337> Member Count', `\`${guild.memberCount}\` Members`,true)
    .addField('<a:starr:719407789117538337> Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``,true)
    .setColor(client.embedColor)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Servers`)
    .setTimestamp()
    .setFooter({
      text:'Love to ' + guild.name,
      iconURL:`https://cdn.discordapp.com/emojis/780983477889400873.gif`
    })
    channel.send({embeds: [embed]});
  }
	
};
