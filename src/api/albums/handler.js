const { errorHandler } = require('../../utils');
const {mapDBToModel,mapDBToAlbumSongService} = require('../../utils');

class AlbumHandler{
    constructor (service , validator){
        this._service = service,
        this._validator = validator;
        
        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
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
    
    async editAlbumHandler(request, h){
        const albumValidated = this._validator.validateAlbumPayload(request.payload);
        const { id } = request.params;

        await this._service.editAlbumId(id, albumValidated);
        const response = h.response({
            status: 'success',
            message: 'Album successfully edited',
        });
        return response
    }
    async deleteAlbumHandler(request,h){
        const { id } = request.params;
        await this._service.deleteAlbumId(id);

        const response = h.response({
            status: 'success',
            message: 'Album berhasil dihapus',
        });
        return response;
    }


}

module.exports = AlbumHandler;