const moment = require('moment');

function getNowFormatted(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

function log(msg, level){
    console[level](getNowFormatted() + ': ' + msg);
}

class Logger {
    warn(msg){
        log(msg, 'warn');
    }

    error(msg){
        log(msg, 'error');
    }

    log(msg){
        log(msg, 'info');
    }
}

module.exports = new Logger();