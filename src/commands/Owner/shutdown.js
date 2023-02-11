
const {  MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const owner = require("../../config.json");

const { config } = require("dotenv");
const { post } = require("node-superfetch");



module.exports = {
    name: "shutdown",
    category: "Owner",
    description: "gd night to wendy",
    args: false,
    aliases:["destroy","bye"],
    usage: "",
    permission: [],
   // cooldowns: '5s',
    owner: true,
 execute: async (message, args, client, prefix) => {

    try{
        message.channel.send("Shutting down...").then((m) => {
          client.destroy();
        });
        await message.channel.send({embeds:[{description:"**Wendy is now asleep**",color:0x29cddc,timestamp:new Date(),footer:{text:`Good  night ZB`,icon_url:`${client.user.displayAvatarURL()}`},thumbnail:{url:`https://cdn.discordapp.com/attachments/852915269784305715/928689967876702218/unknown.png`}}]});
        console.log(`the bot is shutdown`)
      }catch(err){
        message.channel.send({embeds:[{description:`\`OOPSIE\` \`\`\`yml\n${err}\n\`\`\``}]})
      }















 }}