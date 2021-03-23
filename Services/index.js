const app = {
    init:  function(){
        listRenderer.render('/featured-playlists?locale=en_IN')
        listRenderer.render('/new-releases')
        listRenderer.render('/categories?locale=en_IN')
    }
}