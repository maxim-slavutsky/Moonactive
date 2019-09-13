console.log('Starting service');

const redis = require('redis'),
    client = redis.createClient({host: '127.0.0.1', port: 6379}),
    apiClass = require('./api/api'),
    scheduler = require('./scheduler/scheduler');

const api = new apiClass(5555);
api.start();



redis.add_command('xadd');

redis.add_command('xgroup');

redis.add_command('xreadgroup');

client.xadd('mystream', '*', 'field1', 'm1', function (err, msgId) {
    //debugger;
});

client.set("myKey1", "val1", (err, reply)=>{
    if (reply == 'OK'){
        client.get("myKey1", (err, reply) => {
            console.log("myKey1=" + reply);
        })
    }
});