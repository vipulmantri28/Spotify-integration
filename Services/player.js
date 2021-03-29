const playing = {
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
    interval: null,
    firstIns: false,
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
        
    },
    app: function(isavailable, id, data) {
        let filteredData;
        if (this.firstIns === false) {
            if (isavailable === "true") {
                let img;
                if (data.tracks) {
                    filteredData = data.tracks.items.filter(item => item.track.preview_url);
                    img = data.images[0].url;
                    this.cntrlBgDiv.style.backgroundImage = "url(" +img+ ")";
                }else {
                    filteredData = data;
                    img = data.album.images[0].url;
                    this.cntrlBgDiv.style.backgroundImage = "url(" + img + ")";
                }
                
                this.playerIns();
                this.player(filteredData, id);
                this.playlist(filteredData, id);
                
            }else {
                if (data.tracks) {
                    const foundtrack = data.tracks.items.find(item => item.track.id === id);
                    
                    window.open(foundtrack.track.external_urls.spotify);
                }else {
                    window.open(data.external_urls.spotify);
                }
            }
            this.firstIns = true;
            this.nextIcon.addEventListener("click", () => {
                this.nextTrack(filteredData, id)
            });
            this.prevIcon.addEventListener("click", () => {
                this.prevTrack(filteredData, id)
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
                    this.audio.loop = true;
                }else if(this.repeatOne.style.display === "block") {
                    this.repeat.style.display = "none";
                    this.repeatOne.style.display ="none";
                    this.noRepeat.style.display = "block";
                    this.audio.loop = false;
                }else if (this.noRepeat.style.display === "block") {
                    this.repeat.style.display = "block";
                    this.repeatOne.style.display ="none";
                    this.noRepeat.style.display = "none";
                    this.audio.loop = false;
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
                if (this.repeatOne.style.display !== "block") {
                    this.nextTrack(filteredData, id);   
                }
            })
            this.spotifyPlay.addEventListener("click", () => {
                this.playOnSpotify(data);
            })
        }else {
            if (isavailable === "true") {
                if (data.tracks) {
                    filteredData = data.tracks.items.filter(item => item.track.preview_url);
                    const playerPlaylist = [...this.playlistDiv.querySelectorAll(".player-track-div")];
                    const nextTrack = playerPlaylist.filter(item => item.dataset.id === id);
                    const currTrack = this.playlistDiv.querySelector('.current-player');
                    let trckPos;
                    if(nextTrack[0].dataset.pos <= currTrack.dataset.pos) {
                        trckPos = 1;
                    }else if (nextTrack[0].dataset.pos > currTrack.dataset.pos) {
                        trckPos = 0;
                    }
                    this.playTrack(filteredData, currTrack, nextTrack[0], trckPos);
                }else {
                    filteredData = data;
                    const currTrack = this.playlistDiv.querySelector('.current-player');
                    const trckPos = 0;
                    this.playTrack(filteredData, currTrack, currTrack, trckPos)
                }
            }else {
                if (data.tracks) {
                    const foundtrack = data.tracks.items.find(item => item.track.id === id);
                    
                    window.open(foundtrack.track.external_urls.spotify);
                }else {
                    window.open(data.external_urls.spotify);
                }
            }    
        }
        document.body.append(this.playerParent);
        const bgParent = document.querySelector('.tracks-div');
        const bgcurr = bgParent.querySelectorAll('.current-player');
        if (bgcurr.length > 1) {
            bgcurr[0].classList.remove('current-player');
        }
    },
    playlist: function(data, id) {
        if (data.length > 1) {
            let pos = 1;
            data.forEach(item => {
                const track = item.track;
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
                tracksDiv.dataset.pos = pos;
                tracksDiv.dataset.id = track.id;
                tracksDiv.appendChild(trackName);
                tracksDiv.appendChild(artistName);
                this.playlistDiv.appendChild(tracksDiv);
                pos = pos + 1;
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
            tracksDiv.dataset.pos = pos
            tracksDiv.dataset.id = data.id;
            tracksDiv.appendChild(trackName);
            tracksDiv.appendChild(artistName);
            this.playlistDiv.appendChild(tracksDiv);
        }
        const tracksDiv = this.playlistDiv.querySelectorAll('.player-track-div');
        tracksDiv.forEach(track => {
            if (track.dataset.id == id) {
                track.classList.add('current-player');
            }
            track.addEventListener("click", () => {
                const currTrack = this.playlistDiv.querySelector('.current-player');
                let trckPos;
                if (track.dataset.pos <= currTrack.dataset.pos) {
                    trckPos = 1;
                }else if (track.dataset.pos > currTrack.dataset.pos) {
                    trckPos = 0;
                }
                this.playTrack(data, currTrack, track, trckPos)
            })
            
        })

    },
    player: function(data, id) {
        if (data.length > 1) {
            data.forEach(item => {
            if (item.track.id === id) {
                this.audio.src = item.track.preview_url;
                this.currTrackName.textContent = item.track.name;
                const artist = [];
                item.track.artists.forEach(art => {
                    artist.push(art.name);
                })
                this.currArtistName.textContent = artist.join(", "); 
            }
        })}else {
            this.currTrackName.textContent = data.name;
            const artist = [];
            data.artists.forEach(art => {
                artist.push(art.name);
            })
            this.currArtistName.textContent = artist.join(", ");
        }
        this.loader();
        this.audio.play();
        this.audio.play().catch(error => {
            debugger
            console.log(error);
            this.nextTrack(data, id);
        })
        this.playPause();
        this.volChange();
        
        
    },
    playTrack: function(data, currTrack, track, trckPos) {
        debugger
        currTrack.classList.remove('current-player');
        track.classList.add('current-player');
        const bgSync = document.querySelectorAll('.track-anchor-div');
        for (let i = 0; i < bgSync.length; i++) {
            if (bgSync[i].dataset.id === track.dataset.id) {
                bgSync[i].classList.add('current-player');
            }
        }
        const bgParent = document.querySelector('.tracks-div');
        const bgcurr = bgParent.querySelectorAll('.current-player');
        bgcurr[trckPos].classList.remove('current-player');
        this.player(data, track.dataset.id)
        this.playIcon.style.display = 'none';
        this.pauseIcon.style.display = 'block';
        
        clearInterval(this.interval)
    },
    nextTrack: function(data, id) {
        debugger
        this.audio.src = null;
        const currTrack = this.playlistDiv.querySelector('.current-player');
        let trckPos;
        let nextTrack;
        if (currTrack == this.playlistDiv.lastChild) {
            if (this.noRepeat.style.display !== "block") {
                nextTrack = this.playlistDiv.firstChild;
                trckPos = 1;
            }
        }else {
            nextTrack = currTrack.nextSibling;
            trckPos = 0;
        }
        this.playTrack(data, currTrack, nextTrack, trckPos);
    },
    prevTrack: function(data) {
        const currTrack = this.playlistDiv.querySelector('.current-player');
        let trckPos;
        let prevTrack;
        if (currTrack == this.playlistDiv.firstChild) {
            prevTrack = this.playlistDiv.lastChild;
            trckPos = 0;
        }else {
            prevTrack = currTrack.previousSibling;
            trckPos = 1;
        }

        this.playTrack(data, currTrack, prevTrack, trckPos);
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
        
        this.interval = setInterval(() => {
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
        }, 1000)
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
    

