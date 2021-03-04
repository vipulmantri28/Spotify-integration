let access_token = location.hash.substr(0, location.hash.indexOf('&')).replace('#access_token=', '');
console.log(access_token);

fetch('https://api.spotify.com/v1/browse/new-releases?limit=30', {
    headers:{'Authorization': 'Bearer ' + access_token }
})
.then(response => response.json().then(data => {

    for (const item of data.albums.items) {
        const image = document.createElement('img');
        const albumAnchor = document.createElement('a');
        const artistName = document.createElement('p');
        const albumName = document.createElement('p');
        const albumDiv = document.createElement('div');
        const release = document.createElement('div');
        const images = item.images;
        const name = item.name;
        const artists =  item.artists.map(artist => artist.name)
        let showImg;
        const releaseList = document.getElementById('release-wrapper')
        
        
        releaseList.appendChild(release);
        release.appendChild(albumAnchor);
        albumAnchor.appendChild(image);
        albumAnchor.appendChild(albumDiv);
        albumDiv.appendChild(albumName);
        albumDiv.appendChild(artistName);
        
        
        if (images.length) {
            if(images[1]) {
                showImg = images[1].url;
            }else {
                showImg = images[0].url;
            }
        } else {
            null
        }
        image.src = showImg;
        albumName.textContent = name;
        artistName.textContent = artists;
        albumAnchor.href = '#';

        release.className = 'release scroll-img';
        artistName.className = 'artist';
        image.className = 'album-cover';
        albumName.className = 'album-name';
        albumDiv.className = 'album-div';
    };
    
    console.log(data);
}));