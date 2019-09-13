const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    jayson = require('jayson'),
    Base = require('../src/base.js'),
    EndPointBase = require('../src/endPointBase');

class Api extends Base {
    constructor(port) {
        super();
        this.logger.log('Creating API class');

        this.port = port;

        // Init Express webapp
        this.webApp = express();
        this.webApp.use(bodyParser.urlencoded({extended: true}));
        this.webApp.use(bodyParser.json());

        this.initialized = false;
    }

    start(){
        if (!this.initialized){
            this.logger.log('Initializing API...');

            this.loadMethods()
                .then(() => {
                    this.initialized = true;
                    let x = this.webApp.listen(this.port);
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

    loadMethods(){
        var promise = new Promise((resolve, reject) => {
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

        return promise;
    }

    addApiEndpoint(fileName) {
        let endPoint = require('./endpoints/' + fileName);

        if (endPoint instanceof EndPointBase){
            let endPointName = '/' + fileName.replace(/\.[^/.]+$/, '');

            this.webApp.post(endPointName, jayson.server(endPoint).middleware());
        }
    }
}

module.exports = Api;