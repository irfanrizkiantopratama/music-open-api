const { Pool } = require ('pg');
const { nanoid } = require ('nanoid')
const InvariantError = require ('../../exceptions/InvariantError')
const NotFoundError = require ('../../exceptions/NotFoundError')

class SongsService {
    constructor(){
        this._pool = new Pool();
    }

    async addSong({ title, year})
}

module.exports = SongsService ; 