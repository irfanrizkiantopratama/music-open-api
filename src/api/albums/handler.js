const autoBind = require('auto-bind');
const {mapDBToAlbumSongService} = require('../../utils/index');

class AlbumHandler{
    constructor (service , validator){
        this._service = service,
        this._validator = validator,
        autoBind(this)
    }

    async postAlbumHandler(request, h){
        const albumValidated = this._validator.validateAlbumPayload(request.payload);   
        const albumId = await this._service.addAlbum(albumValidated);
        const response = h.response({
            status: 'success',
            data: {
                albumId: album_id,
            },
        });
        response.code(201);
        return response;
    }

    async getAlbumByIdHandler(request, h){
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);

        const resultAlbum = mapDBToAlbumSongService(album.album, album.songs)

        const response = h.response({
            status: 'success',
            data: {
                album: resultAlbum,
            },
        });
        return response

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