const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "grab",
    aliases: ["save"],
    category: "Music",
    description: "Grabs the current song and sends you in dm",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription("> There is no music playing in server,add some!");
            return message.channel.send({embeds: [thing]});
        }

        const song = player.queue.current
        const total = song.duration;
        const current = player.position;

        const dmbut = new MessageButton().setLabel("Check Your Dm").setStyle("LINK").setURL(`https://discord.com/users/${client.id}`)
        const row = new MessageActionRow().addComponents(dmbut)

        let dm = new MessageEmbed()
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL()})
        .setDescription(`💌\`Check Your Dms!\``)
        .setColor(client.embedColor)
        .setFooter({text: `Now u can see the song anytime in my dm :) OwO`})
        .setTimestamp()
        message.reply({embeds: [dm]})
        
        const urlbutt = new MessageButton().setLabel("Search").setStyle("LINK").setURL(song.uri)
        const row2 = new MessageActionRow().addComponents(urlbutt)
        let embed = new MessageEmbed()
            .setDescription(`**Song Name** \n\n > **__Song Name__**: [${song.title}](${song.uri}) \n    `)
            .setThumbnail(song.displayThumbnail())
            .addField(`> **__Song Duration__**:`,`\`[${convertTime(song.duration)}]\``,true)
            .addField(`**__Was added by__**`,`<@${song.requester.id}>`,true)
            .setColor(client.embedColor)
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
         return message.author.send({embeds: [embed]}).catch((e)=> {
            
            console.log(e + `error in grab`)
            message.channel.send({embeds:[{description:`Cannot send private messages! Gomenasai`}]
            }) 
         })
            
    }
};
