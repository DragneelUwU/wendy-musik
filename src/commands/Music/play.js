const { MessageEmbed, Permissions } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "Plays audio from YouTube or Soundcloud",
  args: true,
  usage: "<YouTube URL | Video Name | Spotify URL>",
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  cooldowns: '5s',
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)] });

    const { channel } = message.member.voice;

    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)] });

    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
      volume: 100,
    });
    
    if (!player.queue){
      player.queue.clear()
      return console.log('1')
    
    }

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      await message.react (`🔍`)
      if (!player)
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription("Nothing is playing right now...")] });
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`there was an error while searching: ${err.message}`);
    }
    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`No matches found for - ${search}`)] });
      case 'TRACK_LOADED':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const queue = player.queue
          const thing = new MessageEmbed()
          .setAuthor({
            name:`Added to queue`,
            iconURL:`https://images-ext-1.discordapp.net/external/y9xo3cmx7zqBCO5_G8ihraaodI-Ga8ZNbTYeP6MdVPk/https/cdn.discordapp.com/emojis/763415718271385610.gif`
          })
          .setDescription(`[${track.title}](${track.uri}) ~ [${track.requester}]`)
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("hqdefault"))
            .addField(`Position in queue`,`${queue.tracks.indexOf(track) +1}`,true)
            .addField(`Duration`,`\`${convertTime(track.duration)}\``,true)

          return message.channel.send({ embeds: [thing] });
        }
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        const thing = new MessageEmbed()
          .setColor(client.embedColor)
          .setAuthor({
            name:`Playlist Enquired`,
            iconURL:`https://images-ext-1.discordapp.net/external/y9xo3cmx7zqBCO5_G8ihraaodI-Ga8ZNbTYeP6MdVPk/https/cdn.discordapp.com/emojis/763415718271385610.gif`
          })
          .setTimestamp()
          .setFooter({
            text:`Added by ${message.author.tag}`,
            iconURL:`${message.author.displayAvatarURL()}`
          })
          .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/hqdefault.jpg`)
          .setDescription(`**Songs Grabeed :** **\`${res.tracks.length}\`**\n **Playlist Name :** [${res.playlist.name}](${search}) \n  **Duration :** \`${convertTime(res.playlist.duration)}\` `)
        return message.channel.send({ embeds: [thing] });
      case 'SEARCH_RESULT':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const queue = player.queue
          const thing = new MessageEmbed()
          
          .setAuthor({
            name:`Added to queue`,
            iconURL:`https://images-ext-1.discordapp.net/external/y9xo3cmx7zqBCO5_G8ihraaodI-Ga8ZNbTYeP6MdVPk/https/cdn.discordapp.com/emojis/763415718271385610.gif`
          })
          .setDescription(`**[${track.title}](${track.uri})** ~ [${track.requester}]`)
            .setColor(client.embedColor)
            .setTimestamp()
            .setThumbnail(track.displayThumbnail("hqdefault"))
            .setFooter({
              text:`${message.guild.name}`,
              iconURL:`https://images-ext-2.discordapp.net/external/HaZoqpEVO4ialyWwvqJ8_92pfURr3vPZo2J5nxwr7oY/https/cdn.discordapp.com/emojis/831985215928664135.png`
            })
          //  .addField(`Position in queue`,`${queue.tracks.indexOf(track) +1}`,true)
            .addField(`Duration`,`\`${convertTime(track.duration)}\``,true)
            .addField(`Channel`,`${track.author}`,true)
          return message.channel.send({ embeds: [thing] });
        }
    }
  }
}