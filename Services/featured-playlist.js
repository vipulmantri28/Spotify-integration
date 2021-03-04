fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=20', {
    headers:{Authorization: 'Bearer ' + access_token }
})
.then(response => response.json().then(data => {
    
    for(const item of data.playlists.items) {
        const icon = document.createElement('img');
        const playlistName = document.createElement('p');
        const playlistList = document.createElement('div');
        const playlistAnchor = document.createElement('a');
        const playlistDiv = document.createElement('div');
        const name = item.name;
        const img = item.images.map(image => image.url);

        icon.src = img;
        playlistName.textContent = name;

        const playlistparent = document.getElementById('playlist-wrapper');
        playlistparent.appendChild(playlistList);
        playlistList.appendChild(playlistDiv);
        playlistDiv.appendChild(playlistAnchor);
        playlistAnchor.appendChild(icon);
        playlistAnchor.appendChild(playlistName);
        

        playlistList.className = 'playlist scroll-img';
        playlistAnchor.href = '#';
        playlistAnchor.className = 'playlist-Anchor';
        icon.className = 'playlist-icon';
        playlistName.className = 'playlist-name';
        playlistDiv.className = 'playlist-div';
    }
    
    console.log(data)
}))