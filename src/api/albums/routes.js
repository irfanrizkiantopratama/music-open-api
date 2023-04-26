const routes = (handler) => [
     {
         method: 'GET',
         path: '/albums/{id}',
         handler: handler.getAlbumByIdHandler,
     },
     {
        method:'POST',
        path: '/albums',
        handler: handler.postAlbumHandler,
     },
     {
        method:'PUT',
        path:'/albums/{albumsId}/{id}',
        handler: handler.editAlbumHandler,
     },
     {
        method:'DELETE',
        path:'/albums/{albumsId}/{id}',
        handler: handler.deleteAlbumHandler,
     }
]

module.exports = routes;