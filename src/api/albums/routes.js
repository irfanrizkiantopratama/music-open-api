const routes = (handler) => [
     {
        method:'POST',
        path: '/albums',
        handler: handler.postAlbumsHandler,
     },
     {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumsIdHandler,
     },
     {
        method:'PUT',
        path:'/albums/{id}',
        handler: handler.putAlbumsIdHandler,
     },
     {
        method:'DELETE',
        path:'/albums/{id}',
        handler: handler.deleteAlbumsIdHandler,
     }
]

module.exports = routes;