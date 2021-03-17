let playing  = {}
playing = {
    app: function(anchor) {
        
        const currentPlayer = document.getElementsByClassName('current-player');
        
        if (currentPlayer[0]) {
            currentPlayer[0].classList.remove('current-player');
        }
        
        const previousplayer = document.getElementsByClassName('player-parent');
        if (previousplayer[0]) {
            document.body.removeChild(previousplayer[0])
        }
        anchor.classList.add('current-player');
        if (anchor.dataset.isavailable === "true") {
            audiosrc = anchor.dataset.src;
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


            const audio = new Audio(anchor.dataset.src);
            const playPauseDiv = document.createElement('div');
            const playicon = document.createElement('i');
            const pauseicon = document.createElement('i');
            playPauseDiv.className = 'play-pause-div';
            pauseicon.className = "fas fa-pause-circle";
            playicon.className = "fas fa-play-circle";

            playicon.onclick = audio.play();
            

            playicon.addEventListener('click', function () {
                audio.play();
                playicon.style.display = 'none';
                pauseicon.style.display = 'block';
            })

            pauseicon.addEventListener('click', function() {
                audio.pause();
                playicon.style.display = 'block';
                pauseicon.style.display = 'none';
            }) 

            playerDiv.appendChild(playPauseDiv);
            playPauseDiv.appendChild(playicon);
            playPauseDiv.appendChild(pauseicon);

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

            audio.volume = volumeRange.value/100;

            volumeRange.addEventListener("change", function() {
                audio.volume = volumeRange.value/100;
            })

            playlistVolumeDiv.appendChild(volumeDiv);
            volumeDiv.appendChild(volumeDownIcon);
            volumeDiv.appendChild(volumeRange);
            volumeDiv.appendChild(volumeUpIcon);
            
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

        listArr.forEach(item => {            
            const listItem = item.cloneNode(true);
            playlistdiv.appendChild(listItem);
            listItem.addEventListener("click", function() {
                playing.app(listItem);
            })
        })
        playlistdiv.style.display = 'none';

        playlistIcon.addEventListener('click', function() {
            if (playlistdiv.style.display == 'none') {
                playlistdiv.style.display = 'block';
            } else {
                playlistdiv.style.display = 'none';
            }
        })

        playlistVolumeDiv.appendChild(playlistIcon);
        playlistIcon.appendChild(playlistdiv);
    }
}
    

