const showlist= {
    app: function() {
        const req  = new URL(location.href)
        const id = req.searchParams.get('id');
        this.getdata(id);
    },
    getdata: function(id) {
        let token = document.cookie.split('=');
        let access_token = token[1];

        fetch("https://api.spotify.com/v1/playlists/" + id, {
            headers: {'Authorization': 'Bearer ' + access_token}
        })
        .then (response => response.json().then(data => {
            
            const name = data.name;
            const description = data.description;
            const img = data.images[0].url;

            const playlistContainer = document.querySelector('.playlist-container');
            const playlistWrapper = document.createElement('div');
            const playlistNameDiv = document.createElement('div');
            const playlistName = document.createElement('h2');
            const playlistDescription = document.createElement('h4');
            const playlistDiv = document.createElement('div');
            const playlistImgDiv = document.createElement('div');
            const playlistImg = document.createElement('img');
            const tracksDiv = document.createElement('div');

            playlistWrapper.className = 'playlist-wrapper';
            playlistNameDiv.className = 'playlist-name-div';
            playlistName.className = 'playlist-name';
            playlistImgDiv.className = 'playlist-img-div';
            playlistImg.className = 'playlist-img';
            playlistDiv.className = 'playlist-div';
            playlistDescription.className = 'playlist-description';
            tracksDiv.className = 'tracks-div';

            playlistName.textContent = name;
            playlistDescription.textContent = description;
            playlistImg.src = img;

            playlistContainer.appendChild(playlistWrapper);
            playlistWrapper.appendChild(playlistNameDiv);
            playlistWrapper.appendChild(playlistDiv);
            playlistNameDiv.appendChild(playlistName);
            playlistNameDiv.appendChild(playlistDescription);
            playlistDiv.appendChild(playlistImgDiv);
            playlistImgDiv.appendChild(playlistImg);
            

            for (item of data.tracks.items) {
                
                const trackAnchor = document.createElement('a');
                const trackNameDiv = document.createElement('div');
                const trackName = document.createElement('p');
                const trackArtist = document.createElement('p');
                const trackDuration = document.createElement('p');

                const track = item.track;
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
                
                trackName.textContent = name;
                trackArtist.textContent = artist;
                trackDuration.textContent = time;

                tracksDiv.appendChild(trackAnchor);
                trackAnchor.appendChild(trackNameDiv);
                trackAnchor.appendChild(trackDuration);
                trackNameDiv.appendChild(trackName);
                trackNameDiv.appendChild(trackArtist);

                trackAnchor.className = 'track-anchor';
                trackNameDiv.className = 'track-name-div';
                trackName.className = 'track-name';
                trackArtist.className = 'track-artist';
                trackDuration.className = 'track-duration';
            }

            playlistDiv.appendChild(tracksDiv);
        }))
    }
}