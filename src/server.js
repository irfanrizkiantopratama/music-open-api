require ('dotenv').config();

const Hapi = require ('@hapi/hapi');
const albums = require ('./api/albums');
const songs = require ('./api/songs')
const SongsService = require('./services/postgres/SongsService');
const AlbumService = require('./services/postgres/AlbumsService');
const { AlbumValidator } = require('./validator/albums');
const { SongsValidator } = require ('./validator/songs')
const ClientError = require('../src/exceptions/ClientError');
const NotFoundError = require('../src/exceptions/NotFoundError');

const init  = async () => {
    const albumService = new AlbumService();
    const albumValidator =new AlbumValidator();
    const songsService = new SongsService();
    const songsValidator = new SongsValidator();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin:['*']
            },
        },
    });

    await server.register ([
        {
            plugin: albums,
            options: {
                AlbumService: albumService,
                AlbumsValidator: albumValidator,
            },
        },
        {
            plugin: songs,
            options: {
                SongsService: songsService,
                SongsValidator:  songsValidator,
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`)
}


init()