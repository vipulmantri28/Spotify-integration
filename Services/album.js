const album = {
    app: function() {
        const req = new URL(location.href)
        const id = req.searchParams.get('id');

        this.generate(id);
    },
    generate: function(id) {
        let token = document.cookie.split('=');
        let access_token = token[1];

        fetch('https://api.spotify.com/v1/albums/' + id , {
            headers: {'Authorization' : 'Bearer ' + access_token}
        })
        .then(response => response.json().then(data => {
            const name = data.name;
            const img = data.images[0].url;

            const albumArtists = []

            data.artists.forEach(artist => {
                albumArtists.push(artist.name)
            })

            const artistName = albumArtists.join(', ');



            const albumContainer = document.querySelector('.album-container');
            const albumWrapper = document.createElement('div');
            const albumNameDiv = document.createElement('div');
            const albumName = document.createElement('h2');
            const albumartists = document.createElement('h4');
            const albumDiv = document.createElement('div');
            const albumImgDiv = document.createElement('div');
            const albumImg = document.createElement('img');
            const tracksDiv = document.createElement('div');

            albumWrapper.className = 'album-wrapper';
            albumNameDiv.className = 'album-name-div';
            albumName.className = 'album-name';
            albumImgDiv.className = 'album-img-div';
            albumImg.className = 'album-img';
            albumDiv.className = 'album-div';
            albumartists.className = 'album-artists';
            tracksDiv.className = 'tracks-div';

            albumName.textContent = name;
            albumartists.textContent = artistName;
            albumImg.src = img;

            albumContainer.appendChild(albumWrapper);
            albumWrapper.appendChild(albumNameDiv);
            albumWrapper.appendChild(albumDiv);
            albumNameDiv.appendChild(albumName);
            albumNameDiv.appendChild(albumartists);
            albumDiv.appendChild(albumImgDiv);
            albumImgDiv.appendChild(albumImg);
            

            for (item of data.tracks.items) {
                
                const trackAnchor = document.createElement('div');
                const trackNameDiv = document.createElement('div');
                const trackName = document.createElement('p');
                const trackArtist = document.createElement('p');
                const trackDuration = document.createElement('p');
                const nameIconDiv = document.createElement('div');
                const playIcon = document.createElement('i');

                const track = item;
                const name = track.name;
                const duration = track.duration_ms;
                const art = [];

                track.artists.forEach(artist => {
                    art.push(artist.name)
                });
                
                const artist = art.join(", ");

                let minute = Math.floor(duration / 60000);
                let sec = ((duration % 60000) / 1000).toFixed(0);
                const time =  minute + ':' + (sec < 10 ? '0' : '') + sec;

                if (track.preview_url) {
                    playIcon.className = 'far fa-play-circle';
                    trackAnchor.dataset.src = track.preview_url;
                    trackAnchor.dataset.isavailable = 'true';
                } else {
                    playIcon.className = 'fas fa-external-link-square-alt';
                    trackAnchor.dataset.src = track.external_urls.spotify;
                    trackAnchor.dataset.isavailable = 'false';
                }
                
                trackName.textContent = name;
                trackArtist.textContent = artist;
                trackDuration.textContent = time;

                tracksDiv.appendChild(trackAnchor);
                trackAnchor.appendChild(nameIconDiv);
                trackAnchor.appendChild(trackDuration);
                nameIconDiv.appendChild(playIcon);
                nameIconDiv.appendChild(trackNameDiv);
                trackNameDiv.appendChild(trackName);
                trackNameDiv.appendChild(trackArtist);

                nameIconDiv.className = 'name-icon-div';
                trackAnchor.className = 'track-anchor-div';
                trackNameDiv.className = 'track-name-div';
                trackName.className = 'track-name';
                trackArtist.className = 'track-artist';
                trackDuration.className = 'track-duration';

                trackAnchor.addEventListener('click',function() {
                    playing.app(trackAnchor)  
                 })
            }

            albumDiv.appendChild(tracksDiv);
            console.log(data)
        }))
    }
}