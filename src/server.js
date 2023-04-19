require ('dotenv').config();

const Hapi = require ('@hapi/hapi');
const SongsService = require('./services/postgres/SongsService');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');
const ClientError = require('../src/exceptions/ClientError');
const NotFoundError = require('../src/exceptions/NotFoundError');

const init  = async () => {
    const songsService = new SongsService();
    const albumsService = new AlbumsService();
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
                AlbumsService: albumsService,
                AlbumsValidator: albumsValidator,
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