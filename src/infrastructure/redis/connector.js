const Base = require('../../abstract/base.js'),
    config = require('../../config/app_conf');

/**
 *
 */
class RedisConnector extends Base {
    /**
     * Constructor method
     */
    constructor() {
        super();

        // TODO - take connection data from ENVs
        let connectionOptions = {host : config.REDIS_HOST, port : config.REDIS_PORT};

        this.options = {
            maxReconnectAttempts : 5,
            connection : connectionOptions
        };

        this.isConnected = false;
        this.reconnectAttempts = 0;

        this.connect();
    }

    /**
     *
     */
    addCommands(){
        this.redis.add_command('xadd');
        this.redis.add_command('xgroup');
        this.redis.add_command('xreadgroup');
        this.redis.add_command('xack');
    }

    /**
     *
     */
    connect() {
        this.redis = require('redis');

        this.addCommands();

        this.logger.log(`Connecting to Redis on ${this.options.connection.host}:${this.options.connection.port}`);

        this.client = this.redis.createClient(this.options.connection);

        this.client.on('connect', () => {
            this.logger.log('Redis is connected');
            this.isConnected = true;
            this.reconnectAttempts = 0;
        });

        this.client.on('reconnecting', () => {
            this.isConnected = false;
        });

        this.client.on('error', (err) => {
            this.onError(err);
        });
    }

    /**
     *
     * @param err
     */
    onError(err) {
        if (err.syscall === 'connect' ) {
            if (this.reconnectAttempts >= this.options.maxReconnectAttempts){
                this.logger.error(`Failed to connect to Redis after ${this.options.maxReconnectAttempts} attempts. Exiting!`);

                process.exit(1);
            }
            this.reconnectAttempts++;
            this.logger.warn(`Failed to connect to Redis. Retrying for ${this.reconnectAttempts}th time`);

            return;
        }

        this.logger.warn(err.message);
    }

    /**
     *
     * @param {string} streamName -
     * @param {string} id
     * @param {Array} params
     * @param {Function} callback
     */
    addToQueue(streamName, id, params, callback) {
        id = id || '*';
        this.client.xadd(streamName, id, ...params, callback);
    }

    readFromQueue(groupName, consumerId, count, streamName, messageId, callback){
        let params =['GROUP', groupName, consumerId];

        messageId = (messageId || messageId === 0) ? messageId : '>';
        if (count){
            params.push('COUNT', count);
        }
        params.push('STREAMS', streamName, messageId, callback);

        this.client.xreadgroup(...params);
    }
}

module.exports = new RedisConnector();