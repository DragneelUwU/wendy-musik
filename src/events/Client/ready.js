const { prefix } = require("../../config.js");

module.exports ={
name: "ready",
run: async (client) => {
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    client.user.setPresence({ status: "idle" });

    //Game
    let statuses = ['/help', `Prefix ${prefix}`];
    
 const activities_list = [
    { type: 'PLAYING',  message: `h!help`  },
    {type: 'LISTENING',  message: ` 2 awwsome people ` },
    { type: 'WATCHING', message: `stupidaaA 💖💚💛`, },
    { type: 'PLAYING', message: ` Honto ni baka ` },
   
  ];
  
  
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
  
        client.user.setActivity(activities_list[index].message, { type: activities_list[index].type });
    }, 15000);
 }
}
