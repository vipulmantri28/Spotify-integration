function debounce(func, timeout){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function selection () {
    const searchinp = document.querySelector('.search-box');

    search(searchinp.value);
}
const search = debounce(function(value) {
    let searchInp = document.querySelector('#search-select').value;
    let querytypestring;

    if (searchInp === "") {
        let queryType = ['artist', 'album', 'playlist', 'track', 'show', 'episode' ];
        querytypestring = queryType.toString();
    } else {
        querytypestring = searchInp;        
    }
    
    let encodedtypequery = encodeURIComponent(querytypestring)
    let encodedValue = encodeURI(value);
    let query = "?q=" + encodedValue + "&type=" + encodedtypequery;
    if (value === ''){
        const grandparent = document.querySelector('.search-result')
        grandparent.innerHTML = '';
        grandparent.style.height = "0px";
        grandparent.style.padding = "0px";
    }else {
    fetch("https://api.spotify.com/v1/search" + query,
        {headers: {'Authorization' : 'Bearer ' + access_token}
    })
    .then(response => response.json().then(data => {
        const grandparent = document.querySelector('.search-result')
        grandparent.innerHTML = '';

        
        for(type in data) {
            
            const currType = type;
            const currValues = data[type];
            if (currValues.items.length > 0) {
                if (window.innerWidth > 640) {
                    grandparent.style.height = "320px";
                    grandparent.style.padding = "25px";
                }else {
                    grandparent.style.height = "220px";
                    grandparent.style.padding = "10px";
                }
                const parentContainer = document.createElement('div');
                const parentType = document.createElement('h2');
                const showBtn = document.createElement('button');
                const typeDiv = document.createElement('div');
                const parentDiv = document.createElement('div');
                
                parentContainer.appendChild(typeDiv);
                parentContainer.appendChild(parentDiv);
                typeDiv.appendChild(parentType);
                typeDiv.appendChild(showBtn);
                
                
                parentType.textContent = currType;
                parentContainer.className = "result-container";
                parentDiv.className = "result-parent";
                typeDiv.className = "type-container";
                showBtn.className = "show-btn";
                parentType.className = "type-parent";
                showBtn.textContent = "Show All";
                showBtn.addEventListener("click", function () {
            
                    if (window.innerWidth > 640) {
                        if (parentDiv.style.height === "590px") {
                        showBtn.textContent = "Show All";
                        parentDiv.style.height = "150px";
                        } else {
                            parentDiv.style.height = "590px";
                            showBtn.textContent = "Show Less";
                        }
                    }else {
                        if (parentDiv.style.height == '400px') {
                            parentDiv.style.height = "80px";
                            showBtn.textContent = 'Show All';
                        }else {
                            parentDiv.style.height = "400px";
                            showBtn.textContent = 'Show Less';
                        }
                    }
    
                });
    
    
    
                currValues.items.forEach(item => {
                    const itemName = item.name;
                    let image;
                    if (item.images) {
                        image = item.images;
                    } else {
                        image = item.album.images;
                    }
                    let showImg;
                    
                    const name = document.createElement('p')
                    const img = document.createElement('img');
                    const anchor = document.createElement('a');
                    const div = document.createElement('div');
                    
                    parentDiv.appendChild(div);
                    div.appendChild(anchor);
                    anchor.appendChild(img);
                    anchor.appendChild(name);
                    
                    if (image.length) {
                        if (image[0]) {
                            showImg = image[0].url
                        }else {
                            showImg = image[1].url
                        }
                    }else {
                        showImg = "images/blank-profile.png";
                    }
                    
                    name.textContent = itemName;
                    img.src = showImg;
                    anchor.href = "#"
                    
                    div.className = "result-child";
                    anchor.className = "result-anchor";
                    name.className = "result-name";
                    img.className = "result-img";
                    
                });
                
                
                grandparent.appendChild(parentContainer);
            }else {
                grandparent.style.height = "0px";
                grandparent.style.padding = "0px";
            }
            }
        console.log(data);
    })
    )}
}, 800)

window.addEventListener("load",function filter() {
    const searchFilter = [{title: 'Select Music Type', value: ""},{ title: 'Artists', value: "artist" }, {title: 'Albums', value: "album"}, {title:'Playlists', value: "playlist"},{title:'Tracks', value: "track"}, {title:'Shows', value: "shows"} , {title:'Episodes', value: "episode"} ];
    const selectorSelect = document.querySelector('#search-select');
    searchFilter.forEach(searchelm => {
        const selectorOption = document.createElement('Option');
    
        selectorSelect.appendChild(selectorOption);
        
        selectorOption.value = searchelm.value
        selectorOption.textContent = searchelm.title;

        selectorOption.className = "search-option";
    })
}
)
