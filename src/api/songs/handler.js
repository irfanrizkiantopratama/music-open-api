const autoBind = require('auto-bind');

class SongsHandler {
    constructor(service, validator){
        this._service = service,
        this._validator = validator,
        autoBind(this)
    }

    async postSongHandler(request, h){
        this._validator.validateSongPayload(request.payload);
        const { title = 'Untitled', year, performer, genre, duration } =  request.payload;
        const songId = await this._service.addSong({ title, year, genre, performer, duration });

        const response = h.response({
            status: 'success',
            message: 'song added successfully',
            data: {
                songId,
            },
        });
        response.code(201);
        return response;

    }

    async getSongsHandler (){
        const songs = await this._service.getSongs();
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    async getSongByIdHandler(request){
        const { id } = request.params;
        const song = await this._service.getSongById(id);
        const response = h.response({
            status: 'success',
            data: {
                song,
            }
        });
        return response;

    }

    async putSongByIdHandler(request){
        this._validator.validateSongPayload(request.payload);
        const  { id } = request.params;
        await this._service.editSongById(id, request.payload);

        const response = h.response({
            status: 'success',
            message: 'Song update successfully'
        });
        return response;
    }
    ß
    async deleteSongByHandler(){
        const {id} = request.params;
        await this._service.deleteSongById(id);

        const response = h.response({
            status: 'success',
            message:  'Song delete successfully',
        });
        return response;
    }
}   

module.exports = SongsHandler ;