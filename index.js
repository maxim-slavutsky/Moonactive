const Base = require('./src/abstract/base.js'),
    Api = require('./src/api/api'),
    Scheduler = require('./src/scheduler/scheduler'),
    config = require('./config/app_conf');

class Main extends Base {
    constructor(){
        super();

        this.logger.log('Starting service');

        this.api = new Api(config.API_PORT);
        this.api.start();

        this.scheduler = new Scheduler();
        this.scheduler.start();
    }
}

new Main();


