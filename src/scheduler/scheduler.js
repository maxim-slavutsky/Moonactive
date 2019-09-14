const config = require('../config/app_conf'),
    Base = require('../abstract/base.js'),
    redis = require('../infrastructure/redis/connector'),
    EventModel = require('../model/event');

/**
 * Class responsible for reading new and existing events from queue and processing them.
 */
class Scheduler extends Base {
    /**
     * Initialize new Scheduler class
     */
    constructor() {
        super();

        this.consumerId = 'consumer_' + config.INSTANCE_ID;

        this.createGroup();
    }

    /**
     * Start processing event history and new events from stream
     */
    start(){
        this.recover();

        this.readStream();
    }

    /**
     * Create new consumer group
     */
    createGroup(){
        redis.addGroup(config.EVENTS_STREAM_NAME, config.EVENTS_STREAM_CONSUMER_GROUP_NAME, (err) => {
            if (err){
                this.logger.warn(`Failed to create consumer group '${config.EVENTS_STREAM_CONSUMER_GROUP_NAME}'. ${err.message}`);
            }
        });
    }

    /**
     * Read all NOT acknowledged messages from queue and add them to the schedule
     */
    recover(){
        this.logger.log(`Restoring unprocessed messages from stream for consumer ${config.EVENTS_STREAM_CONSUMER_GROUP_NAME}_${this.consumerId}`);

        redis.consumeFromQueue(config.EVENTS_STREAM_CONSUMER_GROUP_NAME, this.consumerId, 0, config.EVENTS_STREAM_NAME, 0, (err, messages) => {
            if (err){
                this.logger.warn('Failed to read messages to recover');
                return;
            }
            if (messages) {
                this.logger.log(`Recovered ${messages[0][1].length} events from stream history`);
                this.processMessages(messages);
            }
        });
    }

    /**
     * Read new events from stream
     */
    readStream(){
        redis.consumeFromQueue(config.EVENTS_STREAM_CONSUMER_GROUP_NAME, this.consumerId, 1, config.EVENTS_STREAM_NAME, false, (err, messages) => {
            if (err) {
                this.logger.warn(`Failed to read events. ${err.message}`);
            }

            if (messages){
                this.logger.log('Received message from event stream.');

                this.processMessages(messages);
            }

            setTimeout(()=>{
                this.readStream();
            }, 1000);
        });
    }

    /**
     * Extract event object from stream message and schedule event for execution
     *
     * @param messages
     */
    processMessages(messages){
        messages[0][1].forEach((message)=>{
            this.logger.log('Extracting and scheduling event');

            let event = EventModel.extractFromStreamMessage(message);

            event.schedule((event) => {
                this.acknowledgeMessage(event);
            });
        });
    }

    /**
     * Each executed event will be acked to the stream therefore next time process recove from queue this message will be skipped
     *
     * @param {Object} event
     */
    acknowledgeMessage(event){
        this.logger.log(`Acknowledge event ${event.id}`);

        redis.acknowledgeMessage(config.EVENTS_STREAM_NAME, config.EVENTS_STREAM_CONSUMER_GROUP_NAME, event.id, () => {
            // TODO - handle failed acknowledgments
        });
    }
}

module.exports = Scheduler;

