const config = {
    EVENTS_STREAM_NAME : 'events',
    EVENTS_STREAM_CONSUMER_GROUP_NAME : 'event_readers',
    INSTANCE_ID : process.env.INSTANCE_ID || 1,
    API_PORT : process.env.API_PORT || 5000,
    REDIS_HOST : process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT : process.env.REDIS_PORT || 6379
};

module.exports = config;