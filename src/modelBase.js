const Base = require('./base.js');

/**
 *
 */
class ModelBase extends Base {
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = ModelBase;