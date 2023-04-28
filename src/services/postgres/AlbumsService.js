const { nanoid } = require ('nanoid');
const { Pool } = require ('pg');
const NotFoundError =  require ('../../exceptions/NotFoundError');
const InvariantError = require ('../../exceptions/InvariantError');

class AlbumService {
    constructor(){
        this._pool = new Pool();
    }

    async addAlbum({name, year}){
        const id = `album-${nanoid(16)}`
        const createdAt = new Date().toISOString;
        const updatedAt = createdAt;
        const query = {
            text: 'INSERT INTO albums values ($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, year, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id){
            throw new InvariantError ('data album cannot be added');
        }
        return result.rows[0].id;
    }

    async getAlbumById(id){
        const query = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id]
          }
          const querySongs = {
            text: 'SELECT * FROM songs WHERE album_id = $1',
            values: [id]
          }
          const result = await this._pool.query(query)
          const { rows } = await this._pool.query(querySongs)
          if (!result.rows.length) {
            throw new NotFoundError('There is no such file with this ID')
          }
          const reduceSongDetail = rows.map(({ id, title, performer }) => ({ id, title, performer }))
          const response = {
            ...result.rows[0],
            songs: reduceSongDetail
          }
          return response
    }
    
    async editAlbumId(id, {name, year}){
        const updatedAt = new Date().toISOString();
        await this.getAlbumById(id);

        const query = {
            text: 'UPDATE albums SET name= $1, year = $2, updated_at= $3 WHERE id = $4 RETURNING id',
            values: [name,year,updatedAt, id],
        };

        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new NotFoundError('Gagal memperbaharui album. Id tidak ditemukan');
        }
    }
    async deleteAlbumId (id){
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError ('Album has been deleted, id not found')
        }
    }

}

module.exports = AlbumService;