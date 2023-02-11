const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const { glob } = require("glob");
const { post } = require("node-superfetch");
const { pathToFileURL } = require("url");
// const settings = require ('../../../src/config.json')
// const commandsn = require(`../../../src/commands`)
//let com =  require(`../../../src/commands/`)



module.exports = {
    name: "reloadcmd",
    category: "Owner",
    description: "reload bot",
    args: true,
    aliases:['rcmds'],
    usage: "commamd name",
    permission: [],
    owner: true,
    enable:false,
 execute: async (message, args, client, prefix) => {

if(!args[0]) return message.channel.send(`mentionooi category namaye`)
if(!args[1]) return message.channel.send(`mentionooi commando namaye`)

let category= args[0].toLowerCase();
let command = args[1].toLowerCase();


// try {
//     let cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

// if (cmd) {
//     try{

// delete require.cache[require.resolve(`../../../src/commands/${category}/${command}.js`)]
// client.commands.delete(cmd.name)

// const pull = require(`../../../src/commands/${cmd.category}/${cmd.name}.js`)
// client.commands.set(cmd.name,pull)
// console.log(`reloaded ${cmd.name}`)

// return message.reply(`ok ${args[0]}`)

// }catch(e) {

// }
// }else {
//     message.reply(`couldn't find command`)
// }

// }catch(e) {
//     console.log(e)
// }
   
delete require.cache[require.resolve(`../../../src/commands/${category}/${command}.js`)]
client.commands.delete(command)
console.log(`delete`)
try {



const pull = require(`../../../src/commands/${category}/${command}.js`)
client.commands.set(command,pull)
console.log(`reloaded ${command}`)

return message.reply(`ok ${args[1]}`)


} catch(e) {
message.channel.send(`e`)
}








}
}