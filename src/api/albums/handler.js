const { errorHandler } = require('../../utils');
// const {mapDBToModel,mapDBToAlbumSongService} = require('../../utils');

class AlbumHandler{
    constructor (service , validator){
        this._service = service,
        this._validator = validator;
        
        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumHandler = this.deleteAlbumHandler.bind(this);
        
    }

    async postAlbumHandler(request, h){
       try{
        this._validator.validateAlbumPayload(request.payload);
        const {name, year} = request.payload;
        const albumId =  await this._service.addAlbum({ name, year});
        const response = h.response ({
            status: 'success',
            message: 'Album has been added',
            data : {
                albumId
            }
        });
        response.code(201);
        return response

       } catch(error){
        return errorHandler(error,h)
       }
    }

    async getAlbumByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const album = await this._service.getAlbumById(id)
            return {
                status: 'success',
                data : {
                    album
                }
            };
        } catch (error){
            return errorHandler(error,h)
        }
       
    }
    
    async putAlbumByIdHandler(request, h){
       try {
        this._validator.validateAlbumPayload(request.payload);
        const { id } =  request.params
        await this._service.editAlbumId(id, request.payload);
       return {
            status: 'success',
            message: 'Album has been modified'
       }

       } catch (error){
            return errorHandler(error,h)
       }
    }
    async deleteAlbumHandler(request,h){
        try{
            const { id } = request.params
            await this._service.deleteAlbumId(id);
            return {
                status: 'success',
                message: 'Album has been deleted'
            }
        }catch(error){
            return errorHandler (error,h)
        }
    }


}

module.exports = AlbumHandler;