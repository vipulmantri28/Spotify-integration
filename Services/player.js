fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
    headers: {'Authorization' : 'Bearer ' + access_token }
})
.then(response => response.json().then(data => {
    const parent = document.querySelector('.player')

    for (item of data.items) {
        const preview = item.preview_url;
        let audioelm = document.createElement('audio');
        if (preview !== null) {
            audioelm.src = preview;
            audioelm.controls = 'controls'
        }

        parent.appendChild(audioelm);
    }
}))