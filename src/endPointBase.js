const schemaValidator = require('jsonschema');

/**
 *
 */
class EndPointBase {
    validateRequest(request, schema) {
        debugger;
        let valid = schemaValidator.validate(request, schema);
        return valid;
    }

    formatValidationErrors(validationResult) {
        let errors = {};
        validationResult.errors.forEach((error)=>{
            errors[error.argument] = error.message;
        });

        return errors;
    }

    createMethod(func, validationSchema){
        return (data, callback) => {
            let validationResult = this.validateRequest(data, validationSchema);

            if (validationResult.errors.length == 0){
                let responseData = func(data);

                callback(null, {
                    valid : true,
                    data : responseData
                });
            }

            callback(null, {
                valid : false,
                message : 'request validation failed',
                errors : this.formatValidationErrors(validationResult)
            });
        };
    }
}

module.exports = EndPointBase;