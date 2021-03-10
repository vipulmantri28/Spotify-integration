    function showall(wrapper) {
        let _wrapper = document.querySelector(wrapper);
        let parent = _wrapper.parentElement
        let grandparent = parent.parentElement
        let btnContainer = grandparent.querySelector('.tag-container');
        let showbtn= btnContainer.querySelector('.show-button');
        let scrollnext = parent.querySelector('.scroll-next');
        let scrollprev = parent.querySelector('.scroll-previous');
        if (_wrapper.style.flexWrap == 'wrap') {
            _wrapper.style.flexWrap = 'nowrap';
            _wrapper.style.justifyContent = 'flex-start';
            scrollnext.style.display = 'block';
            scrollprev.style.display = 'block';
            showbtn.textContent = 'Show All';
        } else if (_wrapper.style.flexWrap == 'nowrap' || _wrapper.style.flexwrap == undefined) {
            _wrapper.style.flexWrap = 'wrap';
            _wrapper.style.justifyContent = 'center';
            scrollnext.style.display = 'none';
            scrollprev.style.display = 'none';
            showbtn.textContent = 'Show Less';
        }
    }