    searchexp = function() {
    let searchbox = document.querySelector('.search-box');
    let close = document.querySelector('.fa-times-circle')
    if (searchbox.style.visibility == "visible") {
        searchbox.style.visibility = "hidden";
        close.style.visibility = "hidden";
    }else  {
        searchbox.style.visibility = "visible";
        close.style.visibility = "visible";
    }
}
