const Base = require('./abstract/base.js'),
    Api = require('./api/api'),
    Scheduler = require('./scheduler/scheduler'),
    config = require('./config/app_conf');

/**
 * Main class for Moonactive test assignment. Creates API and Scheduler objects.
 */
class Main extends Base {
    /**
     * Initialize the class
     */
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


