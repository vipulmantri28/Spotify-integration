let access_token = location.hash.substr(0, location.hash.indexOf('&')).replace('#access_token=', '');
console.log(access_token)
const mapList = {
    playlists: 'playlist.html',
    albums: 'album.html'
}

const listRendarar = {
    render: function(url){
        let apiurl = 'https://api.spotify.com/v1/browse' + url
        this.fetch(apiurl)
    },
    fetch: function(apiurl){
         fetch( apiurl, {
            headers: {'Authorization': 'Bearer ' + access_token}
        }).then(response =>  { 
            return response.json()
        }).then(data => {
             this.generate(data)
        })
    },

    generate: function(data) {
        const types = ['albums', 'playlists', 'categories']

        const type = Object.keys(data).find(key => types.includes(key))
        typeData = data[type];

        const typeWrapper = document.querySelector('.new-home');
        const typeContainer = document.createElement('div');
        const typeParent = document.createElement('div');
        const typeName = document.createElement('h2');
        const showBtn = document.createElement('button');
        const itemParent = document.createElement('div');
        const scrollBack = document.createElement('i');
        const scrollNext = document.createElement('i');
        const itemWrapper = document.createElement('div');

        typeName.textContent = type;
        showBtn.textContent = 'Show All';

        typeContainer.className = 'value-container';
        typeParent.className = 'value-parent';
        typeName.className = 'value-name';
        showBtn.className = 'show-all';
        itemParent.className = 'item-parent';
        itemWrapper.className = 'item-wrapper ' + type;
        scrollBack.className = 'fas fa-chevron-circle-left';
        scrollNext.className = 'fas fa-chevron-circle-right';

        typeWrapper.appendChild(typeContainer);
        typeContainer.appendChild(typeParent);
        typeContainer.appendChild(itemParent);
        typeParent.appendChild(typeName);
        typeParent.appendChild(showBtn);
        itemParent.appendChild(scrollBack);
        itemParent.appendChild(itemWrapper)
        itemParent.appendChild(scrollNext)

        for (item of typeData.items) {
            const name = item.name;
            let img;
            
            const itemDiv =  document.createElement('div');
            const itemAnchor = document.createElement('a');
            const itemImg = document.createElement('img');
            const itemNameDiv = document.createElement('div');
            const itemName = document.createElement('p');

            itemName.textContent = name;

            if (!item.images) {
                img = item.icons[0];
            }else {
                img = item.images[0];
            }
            
            itemImg.src = img.url;

            itemWrapper.appendChild(itemDiv);
            itemDiv.appendChild(itemAnchor);
            itemAnchor.appendChild(itemImg);
            itemAnchor.appendChild(itemNameDiv);
            itemNameDiv.appendChild(itemName);

            itemAnchor.href = '/' + mapList[type] + '?id=' + item.id;

            if (item.artists) {
                const artist = document.createElement('p');
                const art = [];
                item.artists.forEach(artist => {
                    art.push(artist.name);
                });
                artist.textContent = art.join(", ");
                itemNameDiv.appendChild(artist)
                artist.className = 'artist';
            }

            itemDiv.className = 'item-div';
            itemAnchor.className = 'item-anchor';
            itemImg.className = 'item-img';
            itemNameDiv.className = 'item-name-div';
            itemName.className = 'iteam-name';
        }


        console.log(typeData);
        
        showBtn.addEventListener('click', function showall() {
            if (itemWrapper.style.flexWrap == 'wrap') {
                itemWrapper.style.flexWrap = 'nowrap';
                itemWrapper.style.justifyContent = 'flex-start';
                scrollNext.style.display = 'block';
                scrollBack.style.display = 'block';
                showBtn.textContent = 'Show All';
            } else if (itemWrapper.style.flexWrap == 'nowrap' || itemWrapper.style.flexwrap == undefined) {
                itemWrapper.style.flexWrap = 'wrap';
                itemWrapper.style.justifyContent = 'center';
                scrollNext.style.display = 'none';
                scrollBack.style.display = 'none';
                showBtn.textContent = 'Show Less';
            }
        })

        scrollBack.addEventListener('click', function scrollback() {
            
            if (itemWrapper.style.transform == "translate(-80%)" ) {
                itemWrapper.style.transform = "translate(-60%)"
                scrollNext.style.display = "block"
            }else if (itemWrapper.style.transform == "translate(-60%)") {
                itemWrapper.style.transform = "translate(-40%)";
            }else if (itemWrapper.style.transform == "translate(-40%)") {
                itemWrapper.style.transform = "translate(-20%)";
            }else if (itemWrapper.style.transform == "translate(-20%)") {
                itemWrapper.style.transform = "translate(0px)";
                scrollBack.style.display = "none";
            }
        
        })

        scrollNext.addEventListener('click', function scrollforward() {
            
            if (itemWrapper.style.transform == "translate(0px)" || itemWrapper.style.transform == "" || itemWrapper.style.transform == undefined) {
                itemWrapper.style.transform = "translate(-20%)"
                scrollBack.style.display = "block"
            }else if (itemWrapper.style.transform == "translate(-20%)") {
                itemWrapper.style.transform = "translate(-40%)";
            }else if (itemWrapper.style.transform == "translate(-40%)") {
                itemWrapper.style.transform = "translate(-60%)";
            }else if (itemWrapper.style.transform == "translate(-60%)") {
                itemWrapper.style.transform = "translate(-80%)";
                scrollNext.style.display = "none";
            }
        })

    }
    
}

