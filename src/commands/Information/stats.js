const { MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
let cpustat = require(`cpu-stat`)
const si = require('systeminformation');
let js =   `discord.js`;


module.exports = {
    name: "stats",
    category: "Information",
    aliases: [ "stats" ],
    description: "Shows Wendy's Stats",
    args: false,
    usage: "",
    permission: ["EMBED_LINKS"],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const duration = moment.duration(message.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const cpu = await si.cpu();
        const about = message.client.emoji.about;
        let ccount = client.channels.cache.size;
        let scount = client.guilds.cache.size;
        let mcount = 0; 
client.guilds.cache.forEach((guild) => {
    mcount += guild.memberCount 

})

        cpustat.usagePercent(function(err,percent,seconds){
            if (err) {
                return console.log(err)
            }

        const embed = new MessageEmbed()
           .setAuthor({
            name:client.user.username + " -stats",
            iconURL:client.user.displayAvatarURL()
             })
            .setTimestamp()
            .setColor(message.client.embedColor)
            //.setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({
                text:  `Requested by ${message.author.username}#${message.author.discriminator}`,
                iconURL: message.author.displayAvatarURL
            })
            .addField(
                 "<:statistics:924132996683018310> System ",  `\`\`\`yml\nMemory usage : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/${(
                    os.totalmem() /
                    1024 /
                    1024
                  ).toFixed(2)} MB \nCPU usage : ${percent.toFixed(2)}%\nCPU : ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``, true )
          
                  .addField(`<:stats:924134004624597003> Bot `, `\`\`\`yml\nHomes : ${scount} \nUsers : ${mcount}\nChannels : ${ccount}\`\`\``,true)
             

                  .addField("<:bookshelf:908966883070447646> Library", `\`\`\`yml\nLibrary: ${js} \nNode.js: ${process.version}\nDiscord.js: v${version}\`\`\``, true)

                  .addField("<:wendy:924135346583797850> me ", `\`\`\`yml\nBorn in: ${client.user.createdAt} \nPing: ${Math.round(client.ws.ping)}\nUptime: ${duration}\`\`\``, true)
//             .setDescription(`${about} **Status**
// **= STATISTICS =**
// **• Servers** : ${scount}
// **• Channels** : ${ccount}
// **• Users** : ${mcount}
// **• Discord.js** : v${version}
// **• Node** : ${process.version}
// **= SYSTEM =**
// **• Platfrom** : ${os.type}
// **• Uptime** : ${duration1}
// **• CPU** :
// > **• Cores** : ${cpu.cores}
// > **• Model** : ${os.cpus()[0].model} 
// > **• Speed** : ${os.cpus()[0].speed} MHz
// **• MEMORY** :
// > **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
// > **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
// > **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
// > **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
// `);
         message.channel.send({embeds: [embed]})

        })
    }
	}