scrollback = function(wrapper) {
    wrapperElm = document.querySelector(wrapper);
    parentElm = wrapperElm.parentElement;
    const scrollBack = parentElm.querySelector('.scroll-back');
    const scrollForward = parentElm.querySelector('.scroll-forward');
    

    if (wrapperElm.style.transform == "translate(-80%)" ) {
        wrapperElm.style.transform = "translate(-60%)"
        scrollForward.style.display = "block"
    }else if (wrapperElm.style.transform == "translate(-60%)") {
        wrapperElm.style.transform = "translate(-40%)";
    }else if (wrapperElm.style.transform == "translate(-40%)") {
        wrapperElm.style.transform = "translate(-20%)";
    }else if (wrapperElm.style.transform == "translate(-20%)") {
        wrapperElm.style.transform = "translate(0px)";
        scrollBack.style.display = "none";
    }

}

function scrollforward(wrapper) {
    wrapperElm = document.querySelector(wrapper);
    parentElm = wrapperElm.parentElement;
    const scrollBack = parentElm.querySelector('.scroll-back');
    const scrollForward = parentElm.querySelector('.scroll-forward');
    

    if (wrapperElm.style.transform == "translate(0px)" || wrapperElm.style.transform == "" || wrapperElm.style.transform == undefined) {
        wrapperElm.style.transform = "translate(-20%)"
        scrollBack.style.display = "block"
    }else if (wrapperElm.style.transform == "translate(-20%)") {
        wrapperElm.style.transform = "translate(-40%)";
    }else if (wrapperElm.style.transform == "translate(-40%)") {
        wrapperElm.style.transform = "translate(-60%)";
    }else if (wrapperElm.style.transform == "translate(-60%)") {
        wrapperElm.style.transform = "translate(-80%)";
        scrollForward.style.display = "none";
    }
};
