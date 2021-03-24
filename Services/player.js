const playing = {
    bgSync: [],
    bgParent: [],
    audio: document.createElement('audio'),
    playerParent: document.createElement('div'),
    cntrlParentDiv: document.createElement('div'),
    cntrlDiv: document.createElement('div'),
    cntrlBgDiv: document.createElement('div'),
    trackArtistDiv: document.createElement('div'),
    currTrackName: document.createElement('p'),
    currArtistName: document.createElement('p'),
    playerCntrlDiv: document.createElement('div'),
    playPauseDiv: document.createElement('div'),
    playIcon: document.createElement('i'),
    pauseIcon:  document.createElement('i'),
    nextIcon: document.createElement('i'),
    prevIcon: document.createElement('i'),
    functionalityDiv: document.createElement('div'),
    functionDiv: document.createElement('div'),
    repeatDiv: document.createElement('div'),
    noRepeat: document.createElement('i'),
    repeat: document.createElement('i'),
    repeatOne: document.createElement('i'),
    shuffle: document.createElement('i'),
    playlistIcon: document.createElement('i'),
    spotifyPlay: document.createElement('i'),
    volUpIcon: document.createElement('i'),
    playlistDiv: document.createElement('div'),
    volCntrl: document.createElement('input'),
    volDiv: document.createElement('div'),
    seekParent: document.createElement('div'),
    seekDiv: document.createElement('div'),
    currduration: document.createElement('div'),
    seeker: document.createElement('input'),
    totalDuration: document.createElement('div'),
    filteredData: [],
    playerIns: function() {
        this.playerParent.className = 'player-parent';
        this.trackArtistDiv.className = 'track-artist-div';
        this.playerCntrlDiv.className = 'player-cntrl-div';
        this.playPauseDiv.className = 'play-pause-div';
        this.audio.className = 'track-src';
        this.playIcon.className = 'fas fa-play-circle';
        this.pauseIcon.className = 'fas fa-pause-circle';
        this.nextIcon.className = 'fas fa-forward';
        this.prevIcon.className = 'fas fa-backward';
        this.playlistIcon.className = 'fas fa-list';
        this.playlistDiv.className = 'player-playlist-div';
        this.volDiv.className = 'vol-div';
        this.volUpIcon.className = 'fas fa-volume-up';
        this.volCntrl.className = 'vol-cntrl';
        this.cntrlDiv.className = 'cntrl-div';
        this.functionDiv.className = 'function-div';
        this.functionalityDiv.className = 'functionality-div';
        this.spotifyPlay.className = 'fas fa-external-link-alt';
        this.noRepeat.className = 'fas fa-long-arrow-alt-right';
        this.repeat.className = 'fas fa-redo-alt';
        this.repeatOne.className = 'fas fa-history';
        this.repeatDiv.className = 'repeat-div';
        this.shuffle.className = 'fas fa-random';
        this.currArtistName.className = 'curr-artist-name';
        this.currTrackName.className = 'curr-track-name';
        this.cntrlBgDiv.className = 'cntrl-bg-img';
        this.cntrlParentDiv.className = 'cntrl-parent-div';
        this.seekParent.className = 'seeker-parent';
        this.seekDiv.className = 'seek-div';
        this.seeker.className = 'seeker';
        this.currduration.className = 'curr-duration';
        this.totalDuration.className = 'total-duration';
        
        this.playerParent.appendChild(this.cntrlParentDiv);
        this.playerParent.appendChild(this.functionalityDiv);
        this.cntrlParentDiv.appendChild(this.cntrlBgDiv);
        this.cntrlParentDiv.appendChild(this.cntrlDiv);
        this.cntrlDiv.appendChild(this.trackArtistDiv);
        this.trackArtistDiv.appendChild(this.currTrackName);
        this.trackArtistDiv.appendChild(this.currArtistName);
        this.cntrlDiv.appendChild(this.playerCntrlDiv);
        this.playerCntrlDiv.appendChild(this.prevIcon);
        this.playerCntrlDiv.appendChild(this.playPauseDiv);
        this.playerCntrlDiv.appendChild(this.nextIcon);
        this.playPauseDiv.appendChild(this.audio);
        this.playPauseDiv.appendChild(this.playIcon);
        this.playPauseDiv.appendChild(this.pauseIcon);
        this.functionalityDiv.appendChild(this.functionDiv);
        this.functionDiv.appendChild(this.repeatDiv);
        this.repeatDiv.appendChild(this.noRepeat);
        this.repeatDiv.appendChild(this.repeat);
        this.repeatDiv.appendChild(this.repeatOne);
        this.functionDiv.appendChild(this.shuffle);
        this.functionDiv.appendChild(this.playlistIcon);
        this.functionDiv.appendChild(this.spotifyPlay);
        this.functionDiv.appendChild(this.volUpIcon);
        this.playlistIcon.appendChild(this.playlistDiv);
        this.volUpIcon.appendChild(this.volDiv);
        this.volDiv.appendChild(this.volCntrl);
        this.functionalityDiv.appendChild(this.seekParent);
        this.seekParent.appendChild(this.seekDiv);
        this.seekDiv.appendChild(this.currduration);
        this.seekDiv.appendChild(this.seeker);
        this.seekDiv.appendChild(this.totalDuration);
        
        this.currduration.textContent = "0:00";
        this.totalDuration.textContent = "0:00";
        this.seeker.type = "range";
        this.seeker.min = 0;
        this.seeker.max = 100;
        this.seeker.value = 0
        this.repeat.style.display = "block";
        this.volCntrl.type = "range";
        this.volCntrl.min = 0;
        this.volCntrl.max = 100;
        this.volCntrl.value = 50;
        this.volCntrl.style.transform = 'rotate(-90deg)';
        this.bgSync = document.querySelectorAll('.track-anchor-div');
        this.bgParent = document.querySelector('.tracks-div');
    },
    app: function(data, id, isavailable) {

        if (isavailable === "true") {
            this.playlist(data, id);
            console.log("player data", data)
            let img;
            if (data.tracks) {
                this.filteredData = data.tracks.items.filter(item => item.track.preview_url);
                img = data.images[0].url;
                this.cntrlBgDiv.style.backgroundImage = "url(" +img+ ")";
                data.tracks.items.forEach(item => {
                    if (item.track.id === id) {
                        this.audio.src = item.track.preview_url;
                        this.currTrackName.textContent = item.track.name;
                        const artist = [];
                        item.track.artists.forEach(art => {
                            artist.push(art.name);
                        })
                        this.currArtistName.textContent = artist.join(", "); 
                    }
                });
            }else {
                img = data.album.images[0].url;
                const artist = [];
                data.artists.forEach(art => {
                    artist.push(art.name);
                })
                this.currArtistName.textContent = artist.join(", ");
                this.audio.src = data.preview_url;
                this.currTrackName.textContent = data.name;
            }
            
            this.playerIns();
            this.audio.play();
            this.audio.play().catch(error => {
                this.nextTrack(this.filteredData);
            })
            this.loader();
            this.playPause();
            this.volChange();
            
            
            this.nextIcon.addEventListener("click", () => {
                this.nextTrack(this.filteredData)
            });
            this.prevIcon.addEventListener("click", () => {
                this.prevTrack(this.filteredData)
            });
            this.playlistIcon.addEventListener("click", () => {
                if (this.playlistDiv.style.display === 'block') {
                    this.playlistDiv.style.display = 'none';
                }else {
                    this.playlistDiv.style.display = 'block';
                }
            })
            this.volUpIcon.addEventListener("click", () => {
                if (this.volDiv.style.display === "block") {
                    this.volDiv.style.display = "none";
                }else {
                    this.volDiv.style.display = "block";
                }
            })
            this.repeatDiv.addEventListener("click", () => {
                if (this.repeat.style.display == "block") {
                    this.repeat.style.display = "none";
                    this.repeatOne.style.display ="block";
                    this.noRepeat.style.display = "none";
                }else if(this.repeatOne.style.display === "block") {
                    this.repeat.style.display = "none";
                    this.repeatOne.style.display ="none";
                    this.noRepeat.style.display = "block";
                }else if (this.noRepeat.style.display === "block") {
                    this.repeat.style.display = "block";
                    this.repeatOne.style.display ="none";
                    this.noRepeat.style.display = "none";
                }
            })
            this.shuffle.addEventListener("click", () => {
                if (this.shuffle.style.color === "black") {
                    this.shuffle.style.backgroundColor = "black";
                    this.shuffle.style.color = "darkgray";
                }else {
                    this.shuffle.style.backgroundColor = "darkgray";
                    this.shuffle.style.color = "black";
                }
            })
            this.audio.addEventListener('ended', () => {
            
                if (this.repeatOne.style.display === "block") {
                    this.audio.loop = true;
                    this.audio.play()
                }else {
                    this.audio.loop = false;
                    this.nextTrack(this.filteredData);
                }
            })
            this.spotifyPlay.addEventListener("click", () => {
                this.playOnSpotify(data);
            })
            document.body.append(this.playerParent);
        }else {
            if (data.tracks) {
                const foundtrack = data.tracks.items.find(item => item.track.id === id);
                
                window.open(foundtrack.track.external_urls.spotify);
            }else {
                window.open(data.external_urls.spotify);
            }
        }

        const bgcurr = this.bgParent.querySelectorAll('.current-player');
        if (bgcurr.length > 1) {
            bgcurr[0].classList.remove('current-player');
        }
    },
    playlist: function(data, id) {
        if (data.tracks) {
            data.tracks.items.forEach(item => {
                const track = item.track;
                if (track.preview_url) {
                    const tracksDiv = document.createElement('div');
                    const trackName = document.createElement('p');
                    const artistName = document.createElement('p');
                    tracksDiv.className = 'player-track-div';
                    trackName.className = 'player-track-name';
                    artistName.className = 'player-artist-name';
                    trackName.textContent = track.name;
                    const artist = [];
                    track.artists.forEach(art => {
                        artist.push(art.name);
                    })
                    artistName.textContent = artist.join(", ");
                
                    tracksDiv.dataset.id = track.id;
                    tracksDiv.appendChild(trackName);
                    tracksDiv.appendChild(artistName);
                    this.playlistDiv.appendChild(tracksDiv);
                }
            })
        }else {
            const tracksDiv = document.createElement('div');
            const trackName = document.createElement('p');
            const artistName = document.createElement('p');
            tracksDiv.className = 'player-track-div';
            trackName.className = 'player-track-name';
            artistName.className = 'player-artist-name';
            trackName.textContent = data.name;
            const artist =[];
            data.artists.forEach(art => {
                artist.push(art.name);
            })
            artistName.textContent = artist.join(", ");
            tracksDiv.dataset.id = data.id;
            tracksDiv.appendChild(trackName);
            tracksDiv.appendChild(artistName);
            if (tracksDiv.dataset.id === id) {
                tracksDiv.classlist.add('current-player');
            }
            this.playlistDiv.appendChild(tracksDiv);
        }
        const tracksDiv = this.playlistDiv.querySelectorAll('.player-track-div');
        tracksDiv.forEach(track => {
            if (track.dataset.id == id) {
                console.log(track.dataset.id)
                track.classList.add('current-player');
            }
        })
        console.log(this.playlistDiv);
    },
    playTrack: function(data, currTrack, track) {

        currTrack.classList.remove('current-player');
        track.classList.add('current-player');
        for (let i = 0; i < this.bgSync.length; i++) {
            if (this.bgSync[i].dataset.id === track.dataset.id) {
                this.bgSync[i].classList.add('current-player');
            }
        }

        const bgcurr = this.bgParent.querySelectorAll('.current-player');
        bgcurr[0].classList.remove('current-player');
    
        const foundtrack = data.find(item => item.track.id === track.dataset.id);
        this.audio.src = foundtrack.track.preview_url;
    
        this.currTrackName.textContent = foundtrack.track.name;
        const artist = foundtrack.track.artists.map(art => art.name);
        this.currArtistName.textContent = artist.join(", ");
        clearInterval(this.loader());
        this.audio.load();
    
        this.audio.play();
        this.audio.play().catch(error => {
            this.nextTrack(this.filteredData);
        })
        // this.audio.play().then(this.loader())
        this.playIcon.style.display = 'none';
        this.pauseIcon.style.display = 'block';
        
    },
    nextTrack: function(data) {
        const currTrack = this.playlistDiv.querySelector('.current-player');
        this.audio.pause()
        let nextTrack;
        if (currTrack == this.playlistDiv.lastChild) {
            if (this.noRepeat.style.display === "block") {
                this.pauseIcon.style.display = 'none';
                this.playIcon.style.display = 'block';
            }else {
                nextTrack = this.playlistDiv.firstChild;
                this.playTrack(data, currTrack, nextTrack);
            }
        }else {
            nextTrack = currTrack.nextSibling;
            this.playTrack(data, currTrack, nextTrack);
        }
    },
    prevTrack: function(data) {
        const currTrack = this.playlistDiv.querySelector('.current-player');
        this.audio.pause();
        let prevTrack;
        if (currTrack == this.playlistDiv.firstChild) {
            prevTrack = this.playlistDiv.lastChild;
        }else {
            prevTrack = currTrack.previousSibling;
        }
        this.playTrack(data, currTrack, prevTrack);
    },
    playPause: function() {
        this.pauseIcon.addEventListener("click", () => {
            this.audio.pause();
            this.pauseIcon.style.display = 'none';
            this.playIcon.style.display = 'block';
        })
        this.playIcon.addEventListener("click", () => {
            this.audio.play();
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'block';
        })
    },
    volChange: function() {
        this.volCntrl.addEventListener("change", () => {
            this.audio.volume = this.volCntrl.value/100
        })
    },
    loader: function() {
        
        setInterval(() => {
            let trackMin = Math.floor(this.audio.duration / 60);
            let trackSec = Math.floor(this.audio.duration - trackMin * 60);
            let currMin = Math.floor(this.audio.currentTime / 60);
            let currSec = Math.floor(this.audio.currentTime - currMin * 60);

            if (trackMin < 10) trackMin = "0" + trackMin;
            if (trackSec < 10) trackSec = "0" + trackSec;
            if (currMin < 10) currMin = "0" + currMin;
            if (currSec < 10) currSec = "0" + currSec;
            this.totalDuration.textContent = trackMin + ":" + trackSec;
            this.currduration.textContent = currMin + ":" + currSec;
            this.seeker.value = this.audio.currentTime * (100/this.audio.duration);
        })
    },
    playOnSpotify: function(data) {
        const currTrack = this.playlistDiv.querySelector('.current-player');

        if (data.tracks) {
            const foundtrack = data.tracks.items.find(item => item.track.id === currTrack.dataset.id);
            window.open(foundtrack.track.external_urls.spotify);
        }else {
            window.open(data.external_urls.spotify);;
        }
    }
}
    

