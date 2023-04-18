const autoBind = require('auto-bind');

class SongsHandler {
    constructor(SongsService, SongsValidator){
        this.songsService = SongsService,
        this.songsValidator = SongsValidator,
        autoBind(this)
    }
    async postSongHandler(request, h){
        this._songsValidator.validateSongPayload(request.payload);
        const { title = 'Untitled', year, performer, genre, duration } =  request.payload;
        const songId = await this._songsService.addSong({ title, year, genre, performer, duration });
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

}   

module.exports = SongsHandler ;