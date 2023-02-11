const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "remove",
    category: "Music",
  	description: "Remove a song from the Server queue",
	  args: true,
    usage: "<index no in queue>\n eg w!remove 3 `<>` not required",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription("There are no songs in the queue or played :/,add some !");
            return message.reply({embeds: [thing]});
        }

    const position = (Number(args[0]) - 1);
       if (!position || position > player.queue.size) {
        const number = (position + 1);
         let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription(`Your provided song index doesn't exist .\nTotal Songs: ${player.queue.size}`);
            return message.reply({embeds: [thing]});
        }

    const song = player.queue[position]
		player.queue.remove(position);

		const emojieject = client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor("#da505c")
			.setTimestamp()
			.setDescription(`${emojieject} Removed no.${position} \n${song.title}`)
		  return message.reply({embeds: [thing]});
	
    }
};