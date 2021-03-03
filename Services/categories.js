// let access_token = location.hash.substr(0, location.hash.indexOf('&')).replace('#access_token=', '');


fetch ('https://api.spotify.com/v1/browse/categories?locale=en_IN', {
    headers:{'Authorization': 'Bearer ' + access_token }
})
.then(response => response.json().then(data => {
    
    for(const category of data.categories.items ) {
     const icon = document.createElement('img');
     const categoryName = document.createElement('p');
     const categoryList = document.createElement('div');
     const categoryAnchor = document.createElement('a');
     const categoryDiv = document.createElement('div');
     
     const categoryImage = category.icons.map(categoryimg => categoryimg.url);
     const categryName = category.name;
    

     icon.src = categoryImage;
     categoryName.textContent = categryName;

     const categoryparent = document.getElementById('category-wrapper');
     categoryparent.appendChild(categoryList);
     categoryList.appendChild(categoryDiv);
     categoryDiv.appendChild(categoryAnchor);
     categoryAnchor.appendChild(icon);
     categoryAnchor.appendChild(categoryName);

     categoryList.className = 'category scroll-img';
     categoryAnchor.href = '#';
     categoryAnchor.className = 'category-Anchor';
     icon.className = 'category-icon';
     categoryName.className = 'category-name';
     categoryDiv.className = 'category-div';
    }
    console.log(data)
}))

