const track = {
    trackContainer: document.querySelector('.track-container'),
    trackWrapper: document.createElement('div'),
    trackDiv: document.createElement('div'),
    tracksDiv: document.createElement('div'),
    trackName: document.createElement('p'),
    albumArtistDiv: document.createElement('div'),
    trackImgDiv: document.createElement('div'),
    albumImg: document.createElement('img'),
    albumName: document.createElement('h2'),
    artistName: document.createElement('h4'),
    trackDuration: document.createElement('p'),
    playIconDiv: document.createElement('div'),
    playIcon: document.createElement('i'),

    app: function() {
        const req  = new URL(location.href)
        const id = req.searchParams.get('id');
        this.getdata(id);
    },
    layoutInit: function() {
        this.trackContainer.appendChild(this.trackWrapper);
        this.trackWrapper.appendChild(this.albumArtistDiv);
        this.trackWrapper.appendChild(this.trackDiv);
        this.albumArtistDiv.appendChild(this.albumName);
        this.albumArtistDiv.appendChild(this.artistName);
        this.trackDiv.appendChild(this.trackImgDiv);
        this.trackDiv.appendChild(this.tracksDiv);
        this.trackImgDiv.appendChild(this.albumImg);
        this.tracksDiv.appendChild(this.playIconDiv);
        this.tracksDiv.appendChild(this.trackDuration);
        this.playIconDiv.appendChild(this.playIcon);
        this.playIconDiv.appendChild(this.trackName);

        this.trackDiv.className = 'track-div';
        this.trackDuration.className = 'track-duration';
        this.trackImgDiv.className = 'track-img-div';
        this.trackName.className = 'track-name';
        this.albumArtistDiv.className = 'album-name-div';
        this.albumImg.className = 'album-img';
        this.albumName.className = 'album-name';
        this.trackWrapper.className = 'track-wrapper';
        
        this.playIconDiv.className = 'name-icon-div';
        this.artistName.className = 'album-artists';
        this.tracksDiv.className = 'tracks-div track-anchor-div';
    },
    getdata: function(id) {
        let token = document.cookie.split('=');
        let access_token = token[1];

        fetch("https://api.spotify.com/v1/tracks/" + id, {
            headers: {'Authorization': 'Bearer ' + access_token}
        })
        .then (response => response.json().then(data => {
           
            const name = data.name;

            const min = Math.floor(data.duration_ms / 60000);
            const sec = ((data.duration_ms % 60000)/1000).toFixed(0);
            const duration = min + ':' + (sec<10 ?'0':'') + sec;

            const artist = []
            data.artists.forEach(art => {
                artist.push(art.name);
            })

            this.artistName.textContent = artist.join(", ");
            this.albumImg.src = data.album.images[0].url;
            this.albumName.textContent = data.album.name;
            this.trackName.textContent = name;
            this.trackDuration.textContent = duration;

            if (data.preview_url) {
                this.playIcon.className = 'far fa-play-circle';
                this.tracksDiv.dataset.src = data.preview_url;
                this.tracksDiv.dataset.isavailable = 'true';
            } else {
                this.playIcon.className = 'fas fa-external-link-square-alt';
                this.tracksDiv.dataset.src = data.external_url;
                this.tracksDiv.dataset.isavailable = 'flase';
            }

           this.layoutInit()
            console.log(data)
        }
    ))}
}