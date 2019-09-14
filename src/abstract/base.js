const Logger = require('../infrastructure/logger');

/**
 *
 */
class Base {
    /**
     *
     */
    constructor(){
        this.logger = new Logger(this.constructor.name);
    }
}

module.exports = Base;