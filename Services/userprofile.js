fetch('https://api.spotify.com/v1/me', {
    headers:{'Authorization': 'Bearer ' + access_token}
})
.then(response => response.json().then(data => {

    const name  = data.display_name;
    const email = data.email;
    const img = data.images.map(image => image.url);
    const profileName = document.createElement('p')
    const profileEmail = document.createElement('p');
    const profileImage = document.createElement('img');
    const writtenDiv = document.createElement('div');


    profileName.textContent = name;
    profileEmail.textContent = email;
    profileImage.src = img;

    const loggedIn = document.querySelector('.logged-in');
    loggedIn.appendChild(profileImage);
    loggedIn.appendChild(writtenDiv);
    writtenDiv.appendChild(profileName);
    writtenDiv.appendChild(profileEmail);
    console.log(name, email, img);
    console.log(data);
}))