(function() {
    function horizontalScroll(element) {
        this.el = document.querySelector(element);
        this.init();
    }

    horizontalScroll.prototype = {
        init: function() {
            this.wrapper = this.el.querySelector('.scroll-parent');
            this.scroller = this.el.querySelector('.scroll-button');
            this.scrollContainer = this.el.querySelector('.scroll-container');
            this.scrollback = this.el.querySelector('.scroll-back');
            this.scrollforward = this.el.querySelector('.scroll-forward');


            let a = wrapper.dataset.scrollpos;

            if (a == undefined) {
                a = 0;
            }else {
                a = Number(a);
            }

            a += 800

            
        }
    }
})