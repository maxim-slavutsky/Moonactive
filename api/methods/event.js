const Base = require('../../src/base'),
    MethodBase = require('../../src/endPointBase');

const add_validationSchema = {};
const remove_validationSchema = {};

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

    };

    remove_Implementation(data) {
        debugger;

    };
}

module.exports = new Event();