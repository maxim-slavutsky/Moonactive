const EndPointBase = require('../../abstract/endPointBase'),
    EventModel = require('../../model/event');

const addRequestValidationSchema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/product.schema.json',
    'title': 'Add new event request',
    'type': 'object',
    'properties': {
        'message': {
            'description': 'Event message to be displayed in alert upon reaching event time',
            'type': 'string'
        },
        'timestamp': {
            'description': 'Time of the event',
            'type': 'integer'
        }
    },
    'required': [ 'message', 'timestamp' ]
};

const removeRequestValidationSchema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    '$id': 'http://example.com/product.schema.json',
    'title': 'Remove event request',
    'type': 'object',
    'properties': {
        'id': {
            'description': 'Id of the event to be removed',
            'type': 'integer'
        }
    },
    'required': [ 'id' ]
};

/**
 * Endpoint class that implements Events API with methods for managing events.
 *
 * @extends EndPointBase
 */
class Event extends EndPointBase {
    /**
     * Initialize event model class
     */
    constructor(){
        super();

        // Init instance methods (required by 'jayson' library)
        // Regular class methods cannot be used, since they are added to prototype and don't come up in hasOwnProperty
        this.add = this.createMethod(this.addMethodImplementation, addRequestValidationSchema);
        this.remove = this.createMethod(this.removeMethodImplementation, removeRequestValidationSchema);
    }

    /**
     *
     * @param {Object} data
     */
    addMethodImplementation(data){
        try {
            let event = new EventModel(data.message, data.timestamp);
            event.stream();
        }
        catch(ex){
            return this.getErrorResponse(ex.message);
        }
    }

    /**
     *
     * @param {Object} data
     */
    removeMethodImplementation(data) {
        this.logger.log(data);
    }
}

module.exports = new Event();