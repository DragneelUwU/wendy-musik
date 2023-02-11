const Cluster = require("discord-hybrid-sharding");
let config = require('./config.js')
 const token = config.token
const manager = new Cluster.Manager(`src/index.js`,{
                                       totalShards: 'auto' , //or 'auto'
                                       ///See below for more options
                                       shardsPerClusters: 2, 
                                       //totalClusters: 7,
                                       // keepAlive: {
                                       //    interval: 2000, ///The Interval to send the Heartbeat
                                       //    maxMissedHeartbeats: 5, // The maximal Amount of missing Heartbeats until Cluster will be respawned
                                       //    maxClusterRestarts: 3 ///The maximal Amount of restarts, which can be done in 1 hour with the HeartbeatSystem
                                       // },
                                       mode: "process" ,  //you can also choose worker
                                       token: token,
                                    })
manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({timeout: -1});

// const { ShardingManager } = require('discord.js');

// const manager = new ShardingManager('src/index.js', { token: 'ODkwMDc0NDQzODMxOTkyMzgx.YUqgbA.8kB3QVWo7ESv28bgKItxlSmNyPo' });

// manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

// manager.spawn();

