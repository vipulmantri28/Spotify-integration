const app = {
    init:  function(){
        listRendarar.render('/featured-playlists?locale=en_IN')
        listRendarar.render('/new-releases')
        listRendarar.render('/categories?locale=en_IN')
    }
}