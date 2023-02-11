require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    prefix: process.env.PREFIX || "!", // bot prefix
    ownerID: process.env.OWNERID || "944229630750109726",
    //672695020100386846
    //your discord id
    SpotifyId: process.env.SPOTIFYID || "4ec7f44b454f488cadaeb72757d24284", // Spotify client id.
    SpotifySecret: process.env.SPOTIFYSECRET || "18a789a3cd8443fba99395d5404e3074", // spotify client secret
    mongourl: process.env.MONGO_URI || "", // MongoDb URL
    embedColor:  "#29cddc", // embed colour
    logs: process.env.LOGS || "901291703724572703", 
    guildJoins: process.env.guildjoin || "889695047510011974",
    guildLeaves: process.env.guildleave || "889695047510011974",
    // channel id for guild create and delete logs

    nodes: [
   
    {
        host : `kartadharta.xyz`,
        port : 3000,
        password : "kdlavalink",
        
      },

      {
        host: 'n1.lavalink.milrato.com',
        password: 'discord.gg/milrato',
        ports: 10350,
      },
    
    {
        host:"losingtime.dpaste.org",
        port: 2124,
        password:"SleepingOnTrains"
      },
      // {
      //   host : `lavalink.oops.wtf`,
      //   port : 2000,
      //   password : "www.freelavalink.ga",
        
      // },
      
    ],

//   SpotifyID: process.env.SPOTIFYID || "4ec7f44b454f488cadaeb72757d24284", // spotify client id
//     SpotifySecret: process.env.SPOTIFYSECRET || "18a789a3cd8443fba99395d5404e3074", // spotify client secret

//   nodes: [
//     {
//       host: process.env.NODE_HOST || "disbotlistlavalink.ml",
//       identifer: process.env.NODE_ID || "local",
//       port: parseInt(process.env.NODE_PORT || "443"),
//       password: process.env.NODE_PASSWORD || "LAVA",
//       secure: parseBoolean(process.env.NODE_SECURE || "true"),

//     }
//   ],

}

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
