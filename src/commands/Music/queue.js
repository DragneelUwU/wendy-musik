
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const load = require('lodash');
const { convertTime } = require('../../utils/convert.js');

module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["q"],
    description: "Show the music queue and now playing.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
   execute: async (message, args, client, prefix) => {
  
            const player = client.manager.get(message.guild.id);
       const queue = player.queue;  
   if(!player) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`There is nothingbeing played in server!`)]});
            
            if(!player.queue) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`There are no songs in the queue or played :/,add some !`)]});
           
            if(player.queue.length === "0" || !player.queue.length) {
                const embed = new MessageEmbed()
                .setAuthor({
                    name:`In Queue of ~ ${message.guild.name}`,
                    iconURL:message.guild.iconURL()
                })
                .setColor(client.embedColor)
                .setTimestamp()
                // .setFooter({
                //     text: `Requested by • [${player.queue.current.requester}]`,
                //     iconURL:message.author.displayAvatarURL({dynamic:true})
                // })
                // .setDescription(`**Now Playing** \n[${player.queue.current.title}](${player.queue.current.uri}) ~ \`[${convertTime(queue.current.duration)}]\` `)

                await message.channel.send({
                    embeds: [embed]
                }).catch(() => {});
            } else {
                const queuedSongs = player.queue.map((t, i) => `\`${++i}\` ~ [${t.title}](${t.uri}) ~ [${t.requester}]`);

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;

                if(player.queue.size < 11) {
                    const embed = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setAuthor({
                        name:`Queue For ~ ${message.guild.name}`,
                       iconURL: message.guild.iconURL()
                    })
                    .setDescription(`**__Now Playing :__  \n${player.queue.current.title}** ~ \`[${convertTime(queue.current.duration)}]\`  ~ [${player.queue.current.requester}]\n\n**__Songs in Queue__**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                    .setThumbnail(player.queue.current.thumbnail)
                   

                    await message.channel.send({
                        embeds: [embed]
                    })
                } else {
                    const embed2 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setAuthor({
                        name:`Queue For ~ ${message.guild.name}`,
                       iconURL: message.guild.iconURL()
                    })
                    .setDescription(`**__Now Playing :__  \n${player.queue.current.title}** ~ \`[${convertTime(queue.current.duration)}]\`  ~ [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                    .setThumbnail(player.queue.current.thumbnail)
                   // .setTitle(`${message.guild.name} Queue`)
                   
                   const next = client.emoji.next;
                   const previous = client.emoji.previous;
                 
                  
                    const but1 = new MessageButton()
                    .setCustomId("queue_cmd_but_1")
                     .setLabel("Next")
                    .setEmoji(next)
                    .setStyle("PRIMARY")

                    const but2 = new MessageButton()
                    .setCustomId("queue_cmd_but_2")
                    .setEmoji(previous)
                    .setLabel("Previous")
                    .setStyle("PRIMARY")

                    const but3 = new MessageButton()
                    .setCustomId("queue_cmd_but_3")
                    .setLabel(`${page + 1}/${pages.length}`)
                    .setStyle("SECONDARY")
                    .setDisabled(true)

                    const row1 = new MessageActionRow().addComponents([
                        but2, but3, but1
                    ]);

                    const msg = await message.channel.send({
                        embeds: [embed2],
                        components: [row1]
                    })

                    const collector = message.channel.createMessageComponentCollector({
                        filter: (b) => {
                            if(b.user.id === message.author.id) return true;
                            else {
                                b.reply({
                                    ephemeral: true,
                                    content: `Only **${message.author.tag}** can use this button, please try the command again`
                                });
                                return false;
                            };
                        },
                        time: 60000*7,
                        idle: 30e3
                    });

                    collector.on("collect", async (button) => {
                        if(button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {});
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setAuthor({
                                name:`Queue For ~ ${message.guild.name}`,
                               iconURL: message.guild.iconURL()
                            })
                            .setDescription(`**__Now Playing :__  \n\n${player.queue.current.title}** ~ \`[${convertTime(queue.current.duration)}]\`  ~ [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(player.queue.current.thumbnail)
                           // .setTitle(`${message.guild.name} Queue`)

                            await msg.edit({
                                embeds: [embed3],
                                components: [new MessageActionRow().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
                            })
                        } else if(button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {});
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setAuthor({
                                name:`Queue For ~ ${message.guild.name}`,
                               iconURL: message.guild.iconURL()
                            })
                            .setDescription(`**__Now Playing :__  \n${player.queue.current.title}** ~ \`[${convertTime(queue.current.duration)}]\`  ~ [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({ text: `Requested By ${message.author.tag}`, iconURL:  message.author.displayAvatarURL({ dynamic: true })})
                           .setThumbnail(player.queue.current.thumbnail)
                           // .setTitle(`${message.guild.name} Queue`)

                            await msg.edit({
                                embeds: [embed4],
                                components: [new MessageActionRow().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
                 }).catch(() => {});
                        } else return;
                    });

                    collector.on("end", async () => {
                        await msg.edit({
                            components: []
                        })
                    });
                }
            }
       }
  };
