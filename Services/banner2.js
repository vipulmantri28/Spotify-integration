fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
    headers: {'Authorization' : 'Bearer ' + access_token }
})
.then(response => response.json().then(data => {
    const grandparent = document.querySelector('.secondary-banner');
    const bannerparent = document.querySelector('.sec-banner-parent');
    
    for (item of data.items) {
        const img = item.album.images;
        const name = item.name;
        const preview = item.preview_url;
        const bannerImage = document.createElement('img');
        const bannerName = document.createElement('h2');
        const bannerAnchor  = document.createElement('a')
        const bannerdiv = document.createElement('div');
        const bannerdivname = document.createElement('div');
        let imgsrc;

        if (img.length > 0) {
            imgsrc = img[0].url;
        }else {
            imgsrc = "./images/blank-profile.png";
        }
        
        bannerImage.src = imgsrc;
        bannerName.textContent = name;
        bannerAnchor.href = "#";

        bannerName.style.textTransform = 'Capitalize';

        bannerparent.appendChild(bannerdiv);
        bannerdiv.appendChild(bannerAnchor);
        bannerAnchor.appendChild(bannerImage);
        bannerAnchor.appendChild(bannerdivname);
        bannerdivname.appendChild(bannerName);

        bannerImage.className = "banner-images";
        bannerName.className = "banner-name";
        bannerdiv.className = "banner-div";
        bannerAnchor.className = "banner-anchor";
        bannerdivname.className = "banner-name-div";

        
    }
    
    let bannerdiv = document.querySelectorAll('.banner-div');

    let left = bannerdiv[0];
    let right = bannerdiv[bannerdiv.length - 1];

    left.className += ' left-img';
    right.className += ' right-img';

    grandparent.appendChild(bannerparent);

    function scroller() {
            this._interval = setInterval(function() {
            let a = bannerparent.dataset.slidepos;
            let bannerdiv = document.querySelectorAll('.banner-div')

            if ( a == undefined || a == 0) {
                a = 0;
            }else {
                a = Number(a); 
            }
            a -= 100

            if (a == -300) {
                left.style.left = "330%"
                right.style.right = "0"
            }else if(a == -1000) {
                a = 0;
                left.style.left = "0";
                right.style.right = "330%"
            }

            bannerparent.dataset.slidepos = a;
        
            for (let i = 0; i < bannerdiv.length; i++) {

                bannerdiv[i].style.transform = "translateX("+a+"%)";

                if (a == 0) {
                    bannerdiv[i].style.transition = "";
                }else {
                    bannerdiv[i].style.transition = "transform 0.5s ease-in-out";
                }
            }
        },3000)
    }
    bannerparent.addEventListener("mouseenter", function() {
        clearInterval(_interval);
    });
    
    window.addEventListener('load', scroller());

    bannerparent.addEventListener("mouseleave", function() {
        scroller();
    });

    console.log(data)
}))
