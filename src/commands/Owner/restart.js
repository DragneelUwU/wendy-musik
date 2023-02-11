
const {  MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const owner = require("../../config.json");

const { config } = require("dotenv");
const { post } = require("node-superfetch");



module.exports = {
    name: "restart",
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
        
      }catch(err){
        message.channel.send({embeds:[{description:`\`OOPSIE\` \`\`\`yml\n${err}\n\`\`\``}]})
      }















 }}