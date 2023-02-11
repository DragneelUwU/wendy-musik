const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { convertTime } = require("../../utils/convert.js");

module.exports = async (client,player,  track, payload, guild) => {
  const emojiplay = client.emoji.play;
  const volumeEmoji = client.emoji.volumehigh;
  const emojistop = client.emoji.stop;
  const emojipause = client.emoji.pause;
  const emojiresume = client.emoji.resume;
  const emojiskip = client.emoji.skip;
 
  const thing = new MessageEmbed()
  .setAuthor({
    name: `Playing 🎸`,
    iconURL:`https://cdn.discordapp.com/attachments/726134541638697042/798842241145765958/Music.gif`
    })
      .setDescription(` [${track.title}](${track.uri}) - [${track.requester}]`)
      //${convertTime(track.duration)}
      .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`)
      // https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg
      .setFooter({
        text:`mOOSIc in `,
        iconURL:client.user.displayAvatarURL()
      })
      .addField( `Duration`,`${convertTime(track.duration)}`,true )
      .addField(`Author`,`${track.author}`,true)
      .setColor(`#29cddc`)
      .setTimestamp()

 
    const But3 = new MessageButton()
    .setCustomId("pause")
    .setLabel("Pause")
    .setStyle("PRIMARY");

  const But2 = new MessageButton()
    .setCustomId("stop")
    .setLabel("Stop")
    .setStyle("DANGER");

 
  const But4 = new MessageButton()
    .setCustomId("skip")
    .setLabel("Skip")
    .setStyle("SUCCESS");

  const But5 = new MessageButton()
    .setCustomId("shuf")
    .setLabel("Shuffle")
    .setStyle("SUCCESS");

    const But1 = new MessageButton()
    .setCustomId("loop")
    .setLabel("Loop")
    .setStyle("SUCCESS");


  const row = new MessageActionRow().addComponents(
    But1,
    But2,
    But3,
    But4,
    But5
  );

  let NowPlaying = await client.channels.cache.get(player.textChannel).send({ embeds: [thing], components: [row] });
  player.setNowplayingMessage(NowPlaying);

  const embed = new MessageEmbed().setColor(client.embedColor).setTimestamp();
  const collector = NowPlaying.createMessageComponentCollector({
    filter: (b) => {
      if (
        b.guild.me.voice.channel &&
        b.guild.me.voice.channelId === b.member.voice.channelId
      )
        return true;
      else {
        b.reply({
          content: `You are not connected to ${b.guild.me.voice.channel} to use buttons.`,
          ephemeral: true,
        });
        return false;
      }
    },
    time: track.duration,
  });
  collector.on("collect", async (i) => {
    await i.deferReply({
      ephemeral: false,
    });
    if (i.customId === "loop") {
      if (!player) {
        return collector.stop();
      }
      if (!player.queue.current) {
        let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription("There is no music playing in the server!");
        return message.reply({embeds: [thing]});
    }
      await player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
              text: 'Owo',
              iconURL:  `${client.user.displayAvatarURL()}`
           })
           .setTimestamp()
            .setDescription(
              `🔄 | Looping for  __queue__ is now \`${queueRepeat}\``
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    } else if (i.customId === "stop") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      await player.queue.clear();
      await player.destroy();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
              text: 'cya',
              iconURL:  `https://images-ext-2.discordapp.net/external/gqq_mBremfXf6kiRqU1HYo8ZRm9Wa0PI32WNuW6VWy8/https/cdn.discordapp.com/emojis/809969812984954890.gif`
           })
           .setTimestamp()
            .setDescription(`${emojistop} Music \`stopped\``),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
      return collector.stop();
    } else if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(!player.paused);
      const Text = player.paused
        ? `${emojipause} **Paused** the music`
        : `${emojiresume} **Resumed** the music`;
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
              text: 'UwU',
              iconURL:  `${client.user.displayAvatarURL()}`
           })
           .setTimestamp()
            .setDescription(
              `${Text} \n[${player.queue.current.title}](${player.queue.current.uri})`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
    } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      i.editReply({
        embeds: [
          embed
            .setAuthor({
              name: i.member.user.tag,
              iconURL: i.member.user.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
             text: '㋡',
             iconURL:  `https://cdn.discordapp.com/attachments/726134541638697042/799268980963541012/ezgif.com-gif-maker_17.gif`
          })
          .setTimestamp()
            .setDescription(
              `Skipping current music`
            ),
        ],
      }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 10000);
      });
      if (track.length === 1) {
        return collector.stop();
      }
    } else if (i.customId === "shuf") {
      if (!player) {
        return collector.stop();
      }
      if (!player.queue.current) {
        return i.editReply({ embeds: [embed.setAuthor({ name: i.member.user.tag, iconURL: i.member.user.displayAvatarURL({ dynamic: true }) }).setDescription(`There is no music playing in the server`.setTimestamp().setFooter({
          text:`:/`,
          iconURL:`${client.user.displayAvatarURL()}`
        }))] }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
    }
    if (player.queue.size < 3)  {
      return i.editReply({ embeds: [embed.setAuthor({ name: i.member.user.tag, iconURL: i.member.user.displayAvatarURL({ dynamic: true }) }).setDescription(`No of songs in queue are too less to shuffle`).setTimestamp().setFooter({
        text:`:3`,
        iconURL:`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`
      })] }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
       }
          await player.queue.shuffle()
          const emojishuffle = client.emoji.shuffle;
      i.editReply({ embeds: [embed.setAuthor({ name: i.member.user.tag, iconURL: i.member.user.displayAvatarURL({ dynamic: true }) }).setDescription(`<a:analogtick:725942012054077440> **Shuffled your queue**`).setTimestamp().setFooter({
        text:`:ӭ`,
        iconURL:`https://cdn.discordapp.com/emojis/775531595620417536.gif?v=1`
       } )] }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
      return;
    }
  });
};
