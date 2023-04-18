const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs/',
        handler: handler.postSongHandler,
    },
    {
        method: 'GET',
        path: '/songs/',
        handler: handler.getSongsHandler,
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getSongsIdHandler,
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteSongsIdHander,
    }
]

module.exports = routes;