const playing = {
    audio: null,
    app: function(anchor) {
        
        const currentPlayer = document.getElementsByClassName('current-player');
        
        if (currentPlayer[0]) {
            currentPlayer[0].classList.remove('current-player');
        }
        
        const previousplayer = document.getElementsByClassName('player-parent');
        if (previousplayer[0]) {
            playing.audio.pause()
            document.body.removeChild(previousplayer[0]);
        }
        anchor.classList.add('current-player');
        if (anchor.dataset.isavailable === "true") {
            const audiosrc = anchor.dataset.src;
            const playerPage = document.body;
            const playerParent = document.createElement('div');
            const playerDiv = document.createElement('div');
            const playerTrackDiv = document.createElement('div');
            const playerTrackName = document.createElement('p');
            const playerArtistName = document.createElement('p');
            
            playerDiv.className = "player-div";
            playerTrackName.className = "player-track-name";
            playerArtistName.className = "player-artist-name";
            playerTrackDiv.className = "player-track-div";
            playerParent.className = "player-parent";

            

            playerTrackName.textContent = anchor.querySelector('.track-name').innerHTML;
            playerArtistName.textContent = anchor.querySelector('.track-artist').innerHTML;
            
            playerPage.appendChild(playerParent);
            playerParent.appendChild(playerTrackDiv);
            playerParent.appendChild(playerDiv);
            playerTrackDiv.appendChild(playerTrackName);
            playerTrackDiv.appendChild(playerArtistName);


            playing.audio = new Audio(audiosrc);
            const playPauseDiv = document.createElement('div');
            const playDiv = document.createElement('div');
            const playicon = document.createElement('i');
            const pauseicon = document.createElement('i');
            const next = document.createElement('i');
            const prev = document.createElement('i');
            next.className = 'fas fa-forward';
            prev.className = 'fas fa-backward';
            playDiv.className = 'play-div'
            playPauseDiv.className = 'play-pause-div';
            pauseicon.className = "fas fa-pause-circle";
            playicon.className = "fas fa-play-circle";

            playicon.onclick = playing.audio.play();
            

            playicon.addEventListener('click', function () {
                playing.audio.play();
                playicon.style.display = 'none';
                pauseicon.style.display = 'block';
            })

            pauseicon.addEventListener('click', function() {
                playing.audio.pause();
                playicon.style.display = 'block';
                pauseicon.style.display = 'none';
            }) 

            
            playerDiv.appendChild(playPauseDiv);
            playPauseDiv.appendChild(prev);
            playPauseDiv.appendChild(playDiv);
            playDiv.appendChild(playicon);
            playDiv.appendChild(pauseicon);
            playPauseDiv.appendChild(next);

            const playlistVolumeDiv = document.createElement('div');
            playlistVolumeDiv.className = 'playlist-volume-div';
            playerDiv.appendChild(playlistVolumeDiv);

            this.playlist()
            
            const volumeDiv = document.createElement('div');
            const volumeDownIcon = document.createElement('i');
            const volumeRange = document.createElement('input');
            const volumeUpIcon = document.createElement('i');

            volumeDiv.className = 'volume-div';
            volumeDownIcon.className = 'fas fa-volume-down';
            volumeRange.className = 'volume-range';
            volumeUpIcon.className = 'fas fa-volume-up';

            volumeRange.type = 'range';
            volumeRange.value = 50;
            volumeRange.min = 0;
            volumeRange.max = 100;

            playing.audio.volume = volumeRange.value/100;

            volumeRange.addEventListener("change", function() {
                playing.audio.volume = volumeRange.value/100;
            })

            playlistVolumeDiv.appendChild(volumeDiv);
            volumeDiv.appendChild(volumeDownIcon);
            volumeDiv.appendChild(volumeRange);
            volumeDiv.appendChild(volumeUpIcon);

            next.addEventListener("click", function() {
                const playlistdiv = playlistVolumeDiv.querySelector('.playlist-name');
                let currentplaying = playlistdiv.querySelector('.current-player');
                if (currentplaying == playlistdiv.lastChild) {
                    playing.app(playlistdiv.firstChild);
                    anchor.firstChild.classList.add('current-player');
                }else {
                    playing.app(currentplaying.nextSibling);
                    anchor.nextSibling.classList.add('current-player');
                }
            })
            
            prev.addEventListener("click", function() {
                const playlistdiv = playlistVolumeDiv.querySelector('.playlist-name');
                const currentplaying = playlistdiv.querySelector('.current-player');
                if (currentplaying == playlistdiv.firstChild) {
                    playing.app(playlistdiv.lastChild);
                }else {
                    playing.app(currentplaying.previousSibling);
                }
            })
            console.log(anchor.dataset.src);
        } else {
            window.open(anchor.dataset.src)
        }
    },
    playlist: function() {
        const playlistVolumeDiv = document.querySelector('.playlist-volume-div');
        const playlistdiv = document.createElement('div');
        const playlistIcon = document.createElement('i');
        const listArr = [...document.querySelectorAll(`[data-isavailable= "true"]`)];

        playlistIcon.className = "fas fa-list";
        playlistdiv.className = 'playlist-name';
        
        playlistdiv.style.display = 'none';

        playlistIcon.addEventListener('click', function() {
            if (playlistdiv.style.display == 'none') {
                playlistdiv.style.display = 'block';
            } else {
                playlistdiv.style.display = 'none';
            }
        })
        listArr.forEach(item => {            
            const listItem = item.cloneNode(true);
            playlistdiv.appendChild(listItem);
            listItem.addEventListener("click", function() {
                listItem.classList.add("current-player");
                playing.app(listItem);
            })
        })

        playlistVolumeDiv.appendChild(playlistIcon);
        playlistIcon.appendChild(playlistdiv);
    }
}
    

