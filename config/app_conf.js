const config = {
    EVENTS_STREAM_NAME : 'events',
    EVENTS_STREAM_CONSUMER_GROUP_NAME : 'event_readers',
    INSTANCE_ID : process.env.INSTANCE_ID || 1
};
console.log('INIT CONFIG');
module.exports = config;