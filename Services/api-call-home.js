


const listRenderer = {
    render: function(url){
        let apiurl = 'https://api.spotify.com/v1/browse' + url
        this.fetch(apiurl)
    },
    fetch: function(apiurl){
        let token = document.cookie.split('=');
        let access_token = token[1];
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

            if (type !== 'categories') {
            itemAnchor.href = '/' + mapList[type] + '?id=' + item.id;
            } else {
                itemAnchor.href = '#'
            }

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
        
        let a;
        if (a == undefined) {
            a = 0;
        }else {
            a = Number(a); 
        }
        scrollBack.addEventListener('click', function scrollback() {
            a -= 20;
            
            if (itemWrapper.getBoundingClientRect().left < 0) {
                itemWrapper.style.transform = "translate(-" + a + "%)";
                scrollNext.style.display = "block";
                setTimeout(function() {
                    if (itemWrapper.getBoundingClientRect().left >= 0) {
                        scrollBack.style.display = "none";
                    }
                }, 300)
                
                
            }
            return a;
        })

        scrollNext.addEventListener('click', function scrollforward() {
            a += 20;

            if (itemWrapper.getBoundingClientRect().right > window.innerWidth) {
                itemWrapper.style.transform = "translate(-" + a + "%)";
                scrollBack.style.display = "block";
                setTimeout(function() {
                    if (itemWrapper.getBoundingClientRect().right <= window.innerWidth ) {
                        scrollNext.style.display = "none";
                    }
                }, 300)
            }
            
            return a;
        })
        if (itemWrapper.getBoundingClientRect().right <= window.innerWidth ) {
            scrollNext.style.display = "none";
        }else if (itemWrapper.getBoundingClientRect().left >= 0) {
            scrollBack.style.display = "none";
        }
    }
    
}

