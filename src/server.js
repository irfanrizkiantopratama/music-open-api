require ('dotenv').config();

const Hapi = require ('@hapi/hapi');
const albums = require ('./api/albums');
const songs = require ('./api/songs')
const SongsService = require('./services/postgres/SongsService');
const SongsValidator  = require ('./validator/songs')
const AlbumService = require('./services/postgres/AlbumsService');
const AlbumValidator = require('./validator/albums');
const ClientError = require('../src/exceptions/ClientError');


const init = async () => {
    const songsService = new SongsService();
    const albumService = new AlbumService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator,
            },
        },
        {
            plugin: albums,
            options: {
                service: albumService,
                validator: AlbumValidator,
            },
        }
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};


init();