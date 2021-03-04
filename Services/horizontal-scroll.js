scrollforward = function(wrapper) {
    wrapperElm = document.querySelector(wrapper);
    const imgscroll = wrapperElm.querySelectorAll('.scroll-img')
    const wrapperParent = wrapperElm.parentElement
    const scrollBack = wrapperParent.querySelector('.scroll-back');
    const scrollForward = wrapperParent.querySelector('.scroll-forward');

    
    let a = wrapperElm.dataset.scrollpos

    if (a == undefined) {
        a = 0;
    } else (
        a = Number(a)
    )

    let length = imgscroll.length*100;
    if ( imgscroll.length < 15) {
        a -= 400;
        if (a == -length+800 ) {
            scrollForward.style.display = 'none';
            scrollBack.style.display = 'block';
        }
    }else if ( imgscroll.length > 15) {
        a -= 500;
        if (a == -length+500 ) {
            scrollForward.style.display = 'none';
        }else if (a === -500) {
            scrollBack.style.display = 'block';
        }
    }
    wrapperElm.dataset.scrollpos = a;

    for ( let i = 0; i < imgscroll.length; i++) {
        imgscroll[i].style.transform = "translate("+a+"%)";
        imgscroll[i].style.transition = "transform 0.3s";
    }
};

scrollback = function(wrapper) {
    wrapperElm = document.querySelector(wrapper);
    let imgscroll = wrapperElm.querySelectorAll('.scroll-img')
    const wrapperParent = wrapperElm.parentElement
    const scrollBack = wrapperParent.querySelector('.scroll-back');
    const scrollForward = wrapperParent.querySelector('.scroll-forward');
    let a = wrapperElm.dataset.scrollpos
    
    if (a == undefined) {
        a = 0;
    } else (
        a = Number(a)
    )

    let length = imgscroll.length
    if (length < 15 ) {
        a += 400;
        scrollForward.style.display = 'block';
    }else {
        a += 500;
        scrollForward.style.display = 'block';
    }

    wrapperElm.dataset.scrollpos = a;

    for ( let i = 0; i < imgscroll.length; i++) {
        imgscroll[i].style.transform = "translate("+a+"%)";
        imgscroll[i].style.transition = "transform 0.3s";
    }

    if (a == 0) {
        scrollBack.style.display = 'none';
    }
};