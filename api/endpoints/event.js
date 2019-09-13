const Base = require('../../src/base'),
    MethodBase = require('../../src/endPointBase');

const add_validationSchema = {
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

const remove_validationSchema = {
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

class Event extends MethodBase {
    constructor(){
        super();

        // Init instance methods (required by 'jayson' library)
        // Regular class methods cannot be used, since they are added to prototype and don't come up in hasOwnProperty
        this.add = this.createMethod(this.add_Implementation, add_validationSchema);
        this.remove = this.createMethod(this.remove_Implementation, remove_validationSchema);
    }

    add_Implementation(data){
        debugger;

    }

    remove_Implementation(data) {
        debugger;

    }
}

module.exports = new Event();