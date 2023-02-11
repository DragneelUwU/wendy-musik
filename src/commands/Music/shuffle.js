const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    category: "Music",
    description: "Shuffle queue",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#29cddc")
                .setDescription("There is no song playing,add sone");
            return message.reply({ embeds: [thing] });
        }

        if (!player.queue.tracks[0]) {
        let thing = new MessageEmbed()
            .setColor("#29cddc")
            .setDescription("Not enough songs in queue to shuffle.")
            .setfooter({
                text: `UwU`,
                iconURL: client.user.displayAvatarURL(),
            })
        return message.reply({ embeds: [thing] });
    }
        player.queue.shuffle();

        const emojishuffle = client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`<a:analogtick:725928974877720677> | Queue shuffled **${player.queue.tracks.length}** song(s) !`)
            .setColor(client.embedColor)
            .setTimestamp()
        return message.reply({ embeds: [thing] }).catch(error => client.logger.log(error, "error"));

    }
};