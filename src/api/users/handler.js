const ClientError = require('../../exceptions/ClientError');
const { errorHandler } = require('../../utils');

class UsersHandler {
    constructor ( service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async getUsersByUsernameHandler(request, h){
        try{
            const { username = '' } = request.query;
            const users = await this._service.getUsersByUsername(username);

            return {
                status: 'success',
                data: {
                    users,
                },
            };
            } catch(error){
            return errorHandler(error,h)
           }
    }
}

module.exports = UsersHandler ;