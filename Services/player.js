// const list = [...document.querySelectorAll(`[data-isavailable*="true"]`)];

// const previewUrl = [];
// list.forEach(url => {
//     previewUrl.push(url.dataset.src);
// });
// console.log(previewUrl);

// class Player {

//     anchor = null
//     constructor(anchor) {
//         this.anchor = anchor;
//         this.app()
//     }

//     app() {
//         this.anchor.style.backgroundColor = "darkgray";
//         const icon = this.anchor.querySelector('i');
//         const para = this.anchor.querySelectorAll('p');

//         icon.style.color = 'black';
        
//         for (let i = 0; i < para.length; i++) {
//             para[i].style.color = 'black';
//         }

//         this.anchor.addEventListener('focusout', function () {
//             this.style.backgroundColor = "red";
//         })
        
//     }
// }

const playing = {
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
            const playicon = document.createElement('i');
            const pauseicon = document.createElement('i');
            pauseicon.className = "fas fa-pause-circle"
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

            playerDiv.appendChild(playicon);
            playerDiv.appendChild(pauseicon);

            this.playlist()

            
            console.log(anchor.dataset.src);
        } else {
            window.open(anchor.dataset.src)
        }
    },
    playlist: function() {
        const playerDiv = document.querySelector('.player-div');
        const playlistdiv = document.createElement('div');
        const playlistIcon = document.createElement('i');
        playlistIcon.className = "fas fa-list";
        const listArr = [...document.querySelectorAll(`[data-isavailable= "true"]`)];

        listArr.forEach(item => {            
            const listItem = item.cloneNode(true);
            playlistdiv.appendChild(listItem);
        })
        console.log(playlistdiv);
        playlistdiv.style.display = 'none';

        playlistIcon.addEventListener('click', function() {
            if (playlistdiv.style.display == 'none') {
                playlistdiv.style.display = 'block';
            } else {
                playlistdiv.style.display = 'none';
            }
        })

        playlistdiv.className = 'playlist-name';
        playerDiv.appendChild(playlistIcon);
        playlistIcon.appendChild(playlistdiv);
    }
    
}
    

