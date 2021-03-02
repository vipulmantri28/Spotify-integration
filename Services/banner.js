(function() {
    function slideshow( element ) {
        this.el = document.querySelector( element );
        this.init();
        
    }

    slideshow.prototype = {
        init: function(el) {
            this.wrapper = this.el.querySelector('.slider-wrapper');
            this.slides = this.el.querySelectorAll('.banner-image');
            this.previous = this.el.querySelector('.previous');
            this.next = this.el.querySelector('.next');
            this.leftImage = this.el.querySelector('.left-image');
            this.rightImage = this.el.querySelector('.right-image');
            
            this.autoScroller();
            this.stopStart();
            
        },
        autoScroller: function() {
            let self = this;
            let _wrapper = self.wrapper;
            let _slides = this.slides;
            let _leftImage = self.leftImage;
            let _rightImage = self.rightImage;
            
            
            this._interval = setInterval( function () {
                    let a = _wrapper.dataset.slidepos;

                    if (a === undefined) {
                        a = 0;
                    }else {
                        a = Number(a);
                    }

                    a -= 100;

                    if (a == 0) {
                        _leftImage.style.left = "0";
                    }
                    else if (a == -500) {
                        a = 0;
                        _leftImage.style.left = "0";
                        _rightImage.style.right= "550%";
                    }else if (a == -200) {
                        _leftImage.style.left = "550%";
                        _rightImage.style.right = "0";
                    }
                    _wrapper.dataset.slidepos = a;

                    for ( let i = 0; i < _slides.length ; i++) {
                        _slides[i].style.transform = "translateX("+a+"%)";
                        _slides[i].style.transition = "transform 0.2s";
                    }
                }, 3000);
        },
        stopStart: function() {
            let self = this;
            let _next = self.next;
            let _previous = self.previous;
            let _wrapper = self.wrapper;
            let _slides = this.slides;
            let _leftImage = self.leftImage;
            let _rightImage = self.rightImage;

            self.el.addEventListener("mouseenter", function() {
                clearInterval(self._interval);
                nextImage = function () {
                    let a = _wrapper.dataset.slidepos;

                    if (a === undefined) {
                        a = 0;
                    }else {
                        a = Number(a);
                    }

                    a -= 100;

                    if (a == 0) {
                        _leftImage.style.left = "0";
                    }
                    else if (a == -500) {
                        a = 0;
                        _leftImage.style.left = "0";
                        _rightImage.style.right= "550%";
                    }else if (a == -200) {
                        _leftImage.style.left = "550%";
                        _rightImage.style.right = "0";
                    }
                    _wrapper.dataset.slidepos = a;

                    for ( let i = 0; i < _slides.length ; i++) {
                        _slides[i].style.transform = "translateX("+a+"%)";
                        _slides[i].style.transition = "transform 0.2s";
                    }
                };
                previousImage = function () {
                    let a = _wrapper.dataset.slidepos;

                    if (a === undefined) {
                        a = 0;
                    }else {
                        a = Number(a);
                    }

                    a += 100;

                    if (a == 0) {
                        _leftImage.style.left = "0";
                    }else if (a == 100) {
                        a = -400
                        _rightImage.style.right = "0";
                        _leftImage.style.left = "550%"
                    }else if (a == -100) {
                        _leftImage.style.left = "0";
                        _rightImage.style.right = "550%";
                    }
                    _wrapper.dataset.slidepos = a;

                    for ( let i = 0; i < _slides.length ; i++) {
                        _slides[i].style.transform = "translateX("+a+"%)";
                        _slides[i].style.transition = "transform 0.2s";
                    }
                }
            }, false);
            self.el.addEventListener("mouseleave", function() {
                self.autoScroller();
            }, false);
        }
    };
    document.addEventListener("DOMContentLoaded", function() {
        let slider = new slideshow(".slider");
    });
}) ();