const schemaValidator = require('jsonschema');

/**
 *
 */
class EndPointBase {
    validateSchema(obj, schema) {
        return schemaValidator.validate(obj, schema);
    }

    formatValidationErrors(validationResult) {
        let errors = {};
        validationResult.errors.forEach((error)=>{
            errors[error.property] = error.message;
        });

        return errors;
    }

    createMethod(func, validationSchema){
        return (data, callback) => {
            let validationResult = this.validateSchema(data, validationSchema);

            if (validationResult.errors.length === 0){
                let responseData = func.call(this, data);

                callback(null, {
                    valid : true,
                    data : responseData
                });
                return;
            }

            callback(null, this.getErrorResponse('request validation failed', this.formatValidationErrors(validationResult)));
        };
    }

    getErrorResponse(message, errors){
        const valid = false;

        return {
            valid,
            message,
            errors            
        };
    }
}

module.exports = EndPointBase;