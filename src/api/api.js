const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    jayson = require('jayson'),
    Base = require('../abstract/base.js'),
    EndPointBase = require('../abstract/endPointBase');

/**
 * Main API class that proves resolving and wrapping of various endpoints and methods.
 * New endpoint can be implemented and placed in `endpoints` folder
 */
class Api extends Base {
    /**
     *
     * @param {Integer} port - listening port for API application
     */
    constructor(port) {
        super();

        this.port = port;

        // Init Express webapp
        this.webApp = express()
            .use(bodyParser.urlencoded({extended: true}))
            .use(bodyParser.json());

        this.initialized = false;
    }

    /**
     *
     */
    start() {
        if (!this.initialized){
            this.logger.log('Initializing API...');

            this.loadMethods()
                .then(() => {
                    this.initialized = true;
                    this.webApp.listen(this.port);
                    this.logger.log(`API is up and listening on port ${this.port}`);
                })
                .catch((err) => {
                    this.logger.error(`Failed to initialize API. ${err.message}`);
                    process.exit(1);
                });
            return;
        }

        this.logger.warn('API is already up and listening');
    }

    /**
     *
     * @returns {Promise}
     */
    loadMethods() {
        return new Promise((resolve, reject) => {
            let methodsPath = path.join(__dirname, 'endpoints');

            fs.readdir(methodsPath, (err, files) => {
                if (!err){
                    files.forEach((value) => {
                        this.addApiEndpoint(value);
                    });
                    resolve();
                    return;
                }

                reject(Error('Failed to read methods directory. ' + err.message));
            });
        });
    }

    /**
     *
     * @param {String} fileName
     */
    addApiEndpoint(fileName) {
        let endPoint = require('./endpoints/' + fileName);

        if (endPoint instanceof EndPointBase){
            let endPointName = '/' + fileName.replace(/\.[^/.]+$/, '');

            this.webApp.post(endPointName, jayson.server(endPoint).middleware());
        }
    }
}

module.exports = Api;