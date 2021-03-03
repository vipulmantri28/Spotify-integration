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
    a -= 500;

    wrapperElm.dataset.scrollpos = a;

    for ( let i = 0; i < imgscroll.length; i++) {
        imgscroll[i].style.transform = "translate("+a+"%)";
        imgscroll[i].style.transition = "transform 0.1s";
    }

    if (a == -1500) {
        scrollForward.style.display = 'none';
    }else if (a == -500) {
        scrollBack.style.display = 'block';
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
    a += 500;

    wrapperElm.dataset.scrollpos = a;

    for ( let i = 0; i < imgscroll.length; i++) {
        imgscroll[i].style.transform = "translate("+a+"%)";
        imgscroll[i].style.transition = "transform 0.1s";
    }

    if (a == 0) {
        scrollBack.style.display = 'none';
    }
};