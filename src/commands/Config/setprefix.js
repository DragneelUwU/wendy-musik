const { MessageEmbed } = require("discord.js");
const ecolor = '#29cddc'
const eg = '#66c74c'

const db = require("../../schema/prefix.js");
module.exports = {
    name: "setprefix",
    category: "Config",
    description: "Set Custom Prefix for your server",
    args: false,
    usage: "",
    aliases: ["prefix"],
    permission: [],
    owner: false,
  execute: async (message, args, client, prefix) => {
    
    const data = await db.findOne({ Guild: message.guildId});
    const pre = await args.join(" ")
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('You must have `Manage Guild` permission to use this command.');
    if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("You must provide a **new prefix**!")
        .setColor(`${ecolor}`)
      return message.reply({ embeds: [embed] });
    }
    // if (pre[1]) {
    //    const embed = new MessageEmbed()
    //     .setDescription("Prefix cannot be  of double args")
    //     .setColor(`${ecolor}`)
    //   return message.reply({ embeds: [embed] });
    // }
    if (pre[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("You can not set prefix more than 3 characters")
        .setColor(`${ecolor}`)
      return message.reply({ embeds: [embed] });
    }
     if(data) {
       data.oldPrefix = prefix;
       data.Prefix = pre;
       await data.save()
     const update = new MessageEmbed()
     .setDescription(`Your prefix has been updated to **${pre}**`)
     .setColor('#66c74c')
     .setTimestamp()
     return message.reply({embeds: [update]});
    } else {
     const newData = new db({
        Guild : message.guildId,
        Prefix : pre,
        oldPrefix: prefix
       });
       await newData.save()
     const embed = new MessageEmbed()
     .setDescription(`The new prefix in server is now set to **${pre}**`)
     .setColor('#66c74c')
     .setTimestamp()
     return message.reply({embeds: [embed]});

    }
  }
};
