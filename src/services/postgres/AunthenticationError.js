const ClientError = require ('./ClientError');

class AunthenticationError extends ClientError {
    constructor (message){
        super(message, 401);
        this._name = 'AunthenticationError'    
    }
}

module.exports = AunthenticationError;