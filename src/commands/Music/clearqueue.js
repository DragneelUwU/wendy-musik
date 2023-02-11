const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
  	description: "Clears the entire Queue",
	  args: false,
    usage: "<Number of song in queue>",
    permission: ["SEND_MESSAGES"],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#e94e5c")
                .setTimestamp()
                .setDescription("There is no music playing in the server,add some!");
            return message.reply({embeds: [thing]});
        }

		player.queue.clear();
        message.react("✅")

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
            .setTimestamp()
			.setDescription(`☑️ Your queue has been cleared`)
			  return message.reply({embeds: [thing]});
    }
};