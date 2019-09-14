const config = require('../config/app_conf'),
    ModelBase = require('../abstract/modelBase.js'),
    redis = require('../infrastructure/redis/connector'),
    moment = require('moment');

/**
 *
 */
class Event extends ModelBase {
    /**
     * Initialize Event class
     *
     * @param {string} message
     * @param {Integer} timestamp
     * @param {?string} id
     */
    constructor(message, timestamp, id) {
        super();

        this.logger.log(`Creating new event "${message}" at ${moment(new Date(timestamp)).format('YYYY-MM-DD HH:mm:ss.SSS')}`);

        this.timestamp = timestamp;
        this.message = message;
        this.id = id || '*';
    }

    /**
     * Add event to Redis stream
     */
    stream() {
        if (!redis.isConnected){
            throw Error('Failed to stream event. DB disconnected');
        }

        this.logger.log(`Streaming new event "${this.message}" at ${moment(this.timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')}`);

        redis.addToQueue(config.EVENTS_STREAM_NAME, null, ['timestamp', this.timestamp, 'message', this.message], (err, msgId) => {
            if (err){
                throw Error(`Failed to stream event, ${err.message}`);
            }

            this.id = msgId;

            this.logger.log(`New event streamed with id ${msgId}`);
        });
    }

    /**
     * Extract event data from stream message and create new Event class. Works much like a factory
     *
     * @param {Array} rawArray
     * @returns {Event}
     */
    static extractFromStreamMessage(rawArray){
        return new Event(rawArray[1][3], Number(rawArray[1][1]), rawArray[0]);
    }

    /**
     * Create json string representation for event for pretty print
     * @returns {string}
     */
    toString(){
        return JSON.stringify(this, ['message', 'timestamp']);
    }

    /**
     * Execure event (print message to console) and execute callback method
     */
    execute(){
        this.logger.log(`EXECUTING Event: ${this.id}. Message: "${this.message}"`);
    }

    /**
     * Primitive implementation of event scheduling using setTimeout.
     *
     * @param {Function} callback
     */
    schedule(callback){
        const now = new Date().valueOf();

        callback = callback || (() => {});

        if (this.timestamp <= now) {
            this.logger.log('Event is created in the past run immediate execution!');
            this.execute();
            callback(this);
            return;
        }

        let timeLeft = this.timestamp - now;
        this.logger.log(`Scheduling event to run after ${timeLeft} milliseconds`);
        setTimeout(() => {
            this.execute();
            callback(this);
        }, timeLeft);
    }
}

module.exports = Event;