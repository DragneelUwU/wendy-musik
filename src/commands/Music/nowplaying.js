const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    category: "Music",
    description: "Displays info about the current song played",
    args: false,
    usage: "np ",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
execute: async (message, args, client, prefix) => {
  
        const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#e94e5c")
                .setTimestamp()
                .setDescription("Nothing's curently being played in the server\n use w!play to play something");
            return message.channel.send(thing);
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        const guild = client.guilds.cache.get(player.guild)
        const channel = guild.channels.cache.get(player.textChannel)
        const vchannel = guild.channels.cache.get(player.voiceChannel)
        const volume = guild.channels.cache.get(player.volume)

       // const repeat = 
        
        let embed = new MessageEmbed()
        .setAuthor({
            name:`Now playing in ~ ${message.guild.name}`,
           iconURL:message.guild.iconURL()
        })
        .setTitle(`${song.title}`).setURL(`${song.uri}`)
            .setDescription(`👍 Joined ${vchannel} and 📄 bound to ${channel}`)
            .setThumbnail(song.displayThumbnail("hqdefault"))
            .addField(`Requested by`,`${song.requester}`,true)
            .addField(`Channel`,`${song.author}`,true)
           // .addField(`Info`,`Volume : \`${volume}\`| Loop mode \`${repeat}| ${methods[queue.repeatMode]}\``)
            .addField(`\u200b`,`${convertTime(current)} |\`${progressbar(player)}\`| ${convertTime(total)}`)
            .setColor(client.embedColor)
           // .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
            return message.channel.send({embeds: [embed]})
            //${progressbar(player)}
            //song.displayThumbnail("3")
    }
}
