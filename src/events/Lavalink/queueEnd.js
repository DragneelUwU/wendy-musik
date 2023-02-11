const delay = require("delay");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = async (client, player) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;
	let thing = new MessageEmbed()
		.setColor(client.embedColor)
		.setDescription(`${emojiwarn} **Music queue ended**`)
		.setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
	channel.send({embeds: [thing] });
	 await player.stop();

	// const player = message.client.manager.get(message.guild.id);
	  if (player.playing) {
		  return console.log(	`hello nothing playing`)
	  } else {
	setTimeout(async() => {
		if (!player.playing){
		await player.destroy()
		await	channel.send({embeds:[{description:`Leaving voice channel,no songs added in past 1 min`,color:0x29cddc,timestamp: new Date(),footer:{text:`Thank you for vibing with me <3`,iconURL: client.user.displayAvatarURL()}}]}) 
	
	}
}, 60000);

	  }	
}