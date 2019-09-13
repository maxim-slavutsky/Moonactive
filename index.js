console.log('Starting service');

const apiClass = require('./api/api'),
    scheduler = require('./scheduler/scheduler'),
    api = new apiClass(5555);

api.start();


