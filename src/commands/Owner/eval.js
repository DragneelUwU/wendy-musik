const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const { post } = require("node-superfetch");
const settings = require ('../../../src/config.json')


module.exports = {
    name: "eval",
    category: "Owner",
    description: "Eval Code",
    args: false,
    usage: "<string>",
    permission: [],
    ownerS: true,
 execute: async (message, args, client, prefix) => {
       
        const embed = new MessageEmbed()
            .addField("Input", "```js\n" + args.join(" ") + "```");

        try {
            const code = args.join(" ");
            if (!code) return message.channel.send("Please include the code.");
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "yo sussy baka no token for yaa haaah ?";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(output);
                embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(client.embedColor);
              
            } else {
                embed.addField("Output", "```js\n" + output + "```").setColor(client.embedColor);
            }

            message.channel.send({embeds: [embed]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
            } else {
                embed.addField("Output", "```js\n" + err + "```").setColor("RED");
            }

            message.channel.send({embeds: [embed]});
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
							}