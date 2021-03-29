const showlist= {
    currentPlaying: null,
    tracks: null,
    startPlayer: false,
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
            const passedData = data;
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
            
            let pos = 1;
            for (item of data.tracks.items) {
                if (item.track !== null) {
                    const trackAnchor = document.createElement('div');
                    const trackNameDiv = document.createElement('div');
                    const trackName = document.createElement('p');
                    const trackArtist = document.createElement('p');
                    const trackDuration = document.createElement('p');
                    const nameIconDiv = document.createElement('div');
                    const playIcon = document.createElement('i');

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

                    trackAnchor.dataset.id = track.id;
                    trackAnchor.dataset.pos = pos;

                    if (track.preview_url) {
                        playIcon.className = 'far fa-play-circle';
                        trackAnchor.dataset.isavailable = true;
                    } else {
                        playIcon.className = 'fas fa-external-link-square-alt';
                        trackAnchor.dataset.isavailable = false;
                    }

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
                    pos += 1;
                }
            }
            
            playlistDiv.appendChild(tracksDiv);
            // const trackAnchors = document.querySelectorAll('.track-anchor-div');
            // trackAnchors.forEach(track => {
            //     track.addEventListener("click", function() {
            //         track.classList.add("current-player");
            //         playing.app( track.dataset.isavailable, track.dataset.id, passedData)
            //     })
            // })
            tracksDiv.addEventListener("click", function(event) {
                if (showlist.startPlayer === false) {
                    const target = event.target;
                    if (target.matches("div.track-anchor-div")) {
                        console.log("first click")
                        playing.app(target.dataset.isavailable, target.dataset.id, passedData)
                        target.classList.add('current-player');
                    }
                    showlist.startPlayer = true;
                }else {
                    const target = event.target;
                    if (target.matches("div.track-anchor-div")) {
                        console.log(target);

                        // const currTrack = playlistDiv.querySelector(".current-player");
                        // currTrack.classList.remove('current-player');
                        // let trckPos;
                        // const filteredData = passedData.tracks.items.filter(item => item.track.preview_url);
                        // target.classList.add('current-player');
                        playing.app(target.dataset.isavailable, target.dataset.id, passedData);
                    }
                }
            })
        }))
    },

}