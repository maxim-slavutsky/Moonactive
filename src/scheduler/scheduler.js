const config = require('../config/app_conf'),
    Base = require('../abstract/base.js'),
    redis = require('../infrastructure/redis/connector'),
    EventModel = require('../model/event');

/**
 *
 */
class Scheduler extends Base {
    constructor() {
        super();

        this.consumerId = 'consumer_' + config.INSTANCE_ID;

        this.createGroup();
    }

    start(){
        this.recover();

        this.readStream();
    }

    createGroup(){
        redis.client.xgroup('CREATE', config.EVENTS_STREAM_NAME, config.EVENTS_STREAM_CONSUMER_GROUP_NAME, '$', 'MKSTREAM', (err) => {
            if (err){
                this.logger.warn(`Failed to create consumer group '${config.EVENTS_STREAM_CONSUMER_GROUP_NAME}'. ${err.message}`);
            }
        });
    }

    recover(){
        this.logger.log(`Restoring unprocessed messages from stream for consumer ${config.EVENTS_STREAM_CONSUMER_GROUP_NAME}_${this.consumerId}`);

        redis.readFromQueue(config.EVENTS_STREAM_CONSUMER_GROUP_NAME, this.consumerId, 0, config.EVENTS_STREAM_NAME, 0, (err, messages) => {
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

    readStream(){
        redis.readFromQueue(config.EVENTS_STREAM_CONSUMER_GROUP_NAME, this.consumerId, 1, config.EVENTS_STREAM_NAME, false, (err, messages) => {
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

    processMessages(messages){
        messages[0][1].forEach((message)=>{
            this.logger.log('Extracting event');
            let event = EventModel.extractFromStream(message);
            event.schedule((event) => {
                this.acknowledgeMessage(event);
            });
        });
    }

    acknowledgeMessage(event){
        redis.client.xack(config.EVENTS_STREAM_NAME, config.EVENTS_STREAM_CONSUMER_GROUP_NAME, event.id, () => {
            // TODO - handle failed acknowledges
        });
    }
}

module.exports = Scheduler;

