const { MessageEmbed, Permissions } = require("discord.js");
const db = require("../../schema/prefix.js");
const { Collection } = require("discord.js");
const config = require("../../config.json")


module.exports = {
    name: "messageCreate",
    run: async (client, message,cooldowns) => {
   
      if (message.author.bot) return;
      if (!message.guild) return;
       let prefix = client.prefix;
       const channel = message?.channel;
       const ress =  await db.findOne({Guild: message.guildId})
      if(ress && ress.Prefix)prefix = ress.Prefix;
   
       const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
       if (message.content.match(mention)) {
         const embed = new MessageEmbed()
           .setColor(client.embedColor)
           .setDescription(`**› My prefix in this server is \`${prefix}\`**\n**› You can see my all commands type \`${prefix}\`help**`);
         message.channel.send({embeds: [embed]})
       };
       const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
       const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
       if (!prefixRegex.test(message.content)) return;
       const [ matchedPrefix ] = message.content.match(prefixRegex);
       const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
       const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if(command.enabled === false) {
        return message.reply({  embeds: [{description:'This command is disabled for now or is in beta!',color: 0xe33e4a, timestamp:new Date()
       } ] })
      }

    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.` }).catch(() => {});

    if(!message.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.` }).catch(() => {});
    
    const embed = new MessageEmbed()
        .setColor("RED")
        .setTimestamp();

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
        	reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({embeds: [embed]});
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command.");
        return message.channel.send({embeds: [embed]});
    }
   if (!channel.permissionsFor(message.guild.me)?.has(Permissions.FLAGS.EMBED_LINKS) && client.user.id !== userId) {
       
        let perm = `Error: I need \`EMBED_LINKS\` permission to work.`
        embed.setDescription(perm)
        return channel.send({ embeds:[embed]  });
      }
    if (command.owner === true  && !config.OWNERIDS.includes(message.author.id) ){
      //message.author.id !== `${config.OWNERIDS}`)  {
        embed.setDescription("Only <@672695020100386846> can use this command!");
        console.log('owner cmd ran')
        return message.channel.send({embeds: [embed]});
    }

    const player = message.client.manager.get(message.guild.id);

    if (command.player && !player) {
        embed.setDescription("There is  no music being played in the  guild.");
        return message.channel.send({embeds: [embed]});
    }

    if (command.inVoiceChannel && !message.member.voice.channelId) {
        embed.setDescription("**Join in a voice channel first where i have access <3**!");
        return message.channel.send({embeds: [embed]});
    }

    if (command.sameVoiceChannel) {
    if(message.guild.me.voice.channel) {
        if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
            embed.setDescription(`Be in the same channel as ${message.client.user}!, am connected there`);
            return message.channel.send({embeds: [embed]});
        }
    }
}
 //nsfw thingy
 if(command.nsfw === true) {
    if(message.channel.nsfw === false) {
      return message.reply( {embeds:[{description:
        `This command is NSFW only, mark the channel as nsfw for this command to work`,color:0x33e4a,timestamp: new Date()
      }]})
      //('!')
    }
  }

 // cooldowns
//  if (!cooldowns.has(command.name)) {
//     cooldowns.set(command.name, new Collection());
//   }

//   const now = Date.now();
//   const timestamps = cooldowns.get(command.name);
//   const cooldownAmount = (command.cooldown || 1) * 1000;

//   if (timestamps.has(message.author.id)) {
//     const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

//     if (now < expirationTime) {
//       const timeLeft = (expirationTime - now) / 1000;
//       return message.reply( {embeds:[{description:
//         `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,color:0x33e4a,timestamp: new Date()
//       }]})
//       //(``);
//     }
//   }



    try {
        command.execute(message, args, client, prefix);
    } catch (error) {
        console.log(error);
        embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
        return message.channel.send({embeds: [embed]});
    }
  }
};
