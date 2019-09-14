const schemaValidator = require('jsonschema');

/**
 *
 */
class EndPointBase {
    /**
     * Validate provided object with given schema using Json schema validator
     * @param {Object} obj
     * @param {Object} schema
     * @returns {ValidatorResult}
     */
    validateSchema(obj, schema) {
        return schemaValidator.validate(obj, schema);
    }

    /**
     *
     * @param {Object} validationResult
     */
    formatValidationErrors(validationResult) {
        let errors = {};

        validationResult.errors.forEach((error)=>{
            errors[error.property] = error.message;
        });

        return errors;
    }

    /**
     * Create JSOn Rps method handler by wrapping provided function with some data formatting and error handling
     *
     * @param {Function} func
     * @param {Object} validationSchema
     * @returns {Function}
     */
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

    /**
     * Get Error response object
     *
     * @param {string} message
     * @param {Array} errors
     * @returns {{valid: boolean, message: string, errors: Array}}
     */
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