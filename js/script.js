document.addEventListener('DOMContentLoaded', function(){
        /*Easy selector helper function */
        const select = (el, all = false) => {
                if (!el || typeof el !== 'string') return null;
                el = el.trim();
                if (all) {
                        return [...document.querySelectorAll(el)];
                } else {
                        return document.querySelector(el);
                }
        }
        /* Easy event listener function */
        const on = (type, el, listener, all = false) => {
                let selectEl = select(el, all)
                if (selectEl) {
                if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
                } else {
                selectEl.addEventListener(type, listener)
                }
                }
        }
        /* Easy on scroll event listener  */
        const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
        }
        
        // хедер при при скролле 
        let selectHeader = select('.header')
        if (selectHeader) {
        const headerScrolled = () => {
        if (window.scrollY > 100) {
                selectHeader.classList.add('scrolling')
        } else {
                selectHeader.classList.remove('scrolling')
        }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(window, headerScrolled)
        }
        // бургер
        on('click', '.js-burger', function(e){
                select('.header-collapse').classList.toggle('show');
                select('.nav__overlay').classList.toggle('show');
        })
        on('click', '.js-burger-close, .nav__overlay',  function(e){
                e.preventDefault();
                select('.header-collapse').classList.remove('show');
                select('.nav__overlay').classList.remove('show');
        }, true)

        // menu for adaptive 
        const toggles = document.querySelectorAll('.js-toggle-inner-nav');

        if (window.innerWidth < 1199) {
        toggles.forEach(toggle => {
                toggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const currentMenu = this.parentElement.querySelector(':scope > .js-inner-nav');
                if (!currentMenu) return;
                const siblingMenus = this.parentElement.parentElement.querySelectorAll(':scope > li > .js-inner-nav.show');
                siblingMenus.forEach(menu => {
                        if (menu !== currentMenu) {
                        menu.classList.remove('show');
                        const siblingToggle = menu.parentElement.querySelector(':scope > .js-toggle-inner-nav');
                        if (siblingToggle) {
                                siblingToggle.classList.remove('_active');
                        }
                        }
                });

                currentMenu.classList.toggle('show');
                this.classList.toggle('_active');
                });
        });
        }
        
        
        // observer, анимация на скролле 
        const inViewport = (entries, observer) => {
        entries.forEach(entry => {
                const el = entry.target;

                el.classList.toggle("is-inViewport", entry.isIntersecting);

                if (entry.isIntersecting && !el.classList.contains('watched')) {
                let delay = el.getAttribute('data-delay');
                if (window.innerWidth < 992 && delay) {
                        const delayNum = parseFloat(delay) || 0;
                        delay = Math.min(delayNum, 0.2) + 's';
                }

                if (delay) {
                        el.style.transitionDelay = delay;
                        el.style.animationDelay = delay;
                }

                el.classList.add("watched");
                }
        });
        };

        let ioConfiguration = {
        rootMargin: '0% 0% 0% 0%',
        threshold: 0.2
        };

        const Obs = new IntersectionObserver(inViewport, ioConfiguration);
        document.querySelectorAll('[data-inviewport]').forEach(EL => {
        Obs.observe(EL);
        });



})


