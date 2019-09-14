const logger = require('../infrastructure/logger');

/**
 *
 */
class Base {
    constructor(){
        this.logger = logger;
    }
}

module.exports = Base;