const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    aliases:["pa"],
    description: "Pause the currently playing music",
    args: false,
    usage: "pa || pause",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
    
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setTimestamp()
                .setDescription("Currently not playing anything  in guild !");
            return message.reply({embeds: [thing]});
        }

        const emojipause = client.emoji.pause;

        if (player.paused) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${emojipause} The song is already paused.`)
                .setTimestamp()
                return message.reply({embeds: [thing]});
        }

       const success = player.pause(true);

        const song = player.queue.current;

        let thing = new MessageEmbed()
            .setColor(`#d33443`)
            .setTimestamp()
            .setDescription(`${emojipause} **Song \`PAUSED\`** \n${song.title}  `)
          // message.reply({embeds: [thing]});
          if (success) message.channel.send({embeds: [thing]})
      
	
    }
};
