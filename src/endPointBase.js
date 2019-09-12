const schemaValidator = require('jsonschema');

class EndPointBase {
    validateRequest(request, schema) {
        return true;
    }

    createMethod(func, validationSchema){
        return (data, callback) => {
            if (this.validateRequest(data, validationSchema)){
                let responseData = func(data);

                callback(null, {
                    valid : true,
                    data : responseData
                });
            }

            callback(null, {
                valid : false,
                message : 'request validation failed'
            });
        }
    }
}

module.exports = EndPointBase;