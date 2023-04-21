require ('dotenv').config();

const Hapi = require ('@hapi/hapi');
const albums = require ('./api/albums');
const songs = require ('./api/songs')
const SongsService = require('./services/postgres/SongsService');
const AlbumService = require('./services/postgres/AlbumsService');
const  AlbumValidator = require('./validator/albums');
const  SongsValidator  = require ('./validator/songs')
const ClientError = require('../src/exceptions/ClientError');

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

    server.ext('onPreResponse', (request, h) => {
        const {response} = request;

        if (response instanceof Error){

            if (response instanceof ClientError){
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }

            if (!response.isServer){
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                });
                newResponse.code(response.statusCode);
                return newResponse;
            }

            const newResponse = h.response({
                status: 'error',
                message: 'terjadi kegagalan pada server kami',
            });

            newResponse.code(500);
            return newResponse;
        }

        return h.continue;
    });
    

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`)
};


init();