const moment = require('moment'),
    config = require('../config/app_conf');

/**
 * Wrapper class for console.log with several styling enhancements
 */
class Logger {
    constructor(className) {
        this.className = className;
    }
    /**
     * Get current date and time formatted with milliseconds accuracy
     *
     * @returns {string}
     */
    getNowFormatted(){
        return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    }

    /**
     * Print log to console implementation
     *
     * @param {String} msg
     * @param {String} level
     */
    writeLog(msg, level){
        console[level](`POD#${config.INSTANCE_ID}|${this.getNowFormatted()}|${this.className}: ${msg}`);
    }

    /**
     * Log message with WARNING level
     *
     * @param {String} msg
     */
    warn(msg){
        this.writeLog(msg, 'warn');
    }

    /**
     * Log message with ERROR level
     * @param {String} msg
     */
    error(msg){
        this.writeLog(msg, 'error');
    }

    /**
     * Log message with INFO level
     *
     * @param {String} msg
     */
    log(msg){
        this.writeLog(msg, 'info');
    }
}

module.exports = Logger;