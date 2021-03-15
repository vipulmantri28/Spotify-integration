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
            const player = document.createElement('audio');
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
            player.className = "player";
            
            player.src = audiosrc;
            playerTrackName.textContent = anchor.querySelector('.track-name').innerHTML;
            playerArtistName.textContent = anchor.querySelector('.track-artist').innerHTML;
            
            playerPage.appendChild(playerParent);
            playerParent.appendChild(playerTrackDiv);
            playerParent.appendChild(playerDiv);
            playerTrackDiv.appendChild(playerTrackName);
            playerTrackDiv.appendChild(playerArtistName);
            playerDiv.appendChild(player);
            console.log(anchor.dataset.src);
        } else {
            window.open(anchor.dataset.src)
        }
    }
}



