// jQuery
import $ from 'jquery';

// Swiper
import Swiper, { Navigation, Pagination, Thumbs, Grid} from 'swiper';
import 'swiper/css/bundle';

// Normalize
import 'normalize.css';

// Fancybox
// window.jQuery = window.$ = $
// require("@fancyapps/fancybox/dist/jquery.fancybox");
// import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";

// Inputmask
// import Inputmask from "inputmask";


import '../styles/index.sass';

const burger = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    // const mobileHeader = document.querySelector('.js-header-nav-menu');
    const mobileHeader = document.querySelector('.js-header');
    
    menuToggle.addEventListener('click', () => {
        const isOpened = menuToggle.getAttribute('aria-expanded') === "true";
        isOpened ? closeMenu() : openMenu();
    });
    
    function openMenu() {
        menuToggle.setAttribute('aria-expanded', "true");
        mobileHeader.setAttribute('data-state', "opened");
    }
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', "false");
        mobileHeader.setAttribute('data-state', "closing");
        
        mobileHeader.addEventListener('animationend', () => {
            mobileHeader.setAttribute('data-state', "closed");
        }, {once: true})
    }
}

// HEADER FIXED
$(window).on('scroll', function() {
    if ($(window).scrollTop() > $('header').height()) {
      $('body').addClass('header-scroll-top');
    } else if ($(window).scrollTop() == 0) {
      $('body').removeClass('header-scroll-top');
    }
});

const tariffSlider = () => {
    if(document.querySelector('.js-tariff-swiper')){
        const reviewsSwiper = new Swiper('.js-tariff-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            // grabCursor: true,
            // slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            breakpoints: {
                744: {
                    slidesPerView: 2,
                }
            },
            pagination: {
                el: '.js-tariff-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
}

const stageSlider = () => {
    if(document.querySelector('.js-stage-swiper')){
        const reviewsSwiper = new Swiper('.js-stage-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            // grabCursor: true,
            // slideToClickedSlide: true,
            // slidesPerView: 1.5,
            slidesPerView: 'auto',
            spaceBetween: -29,
            // spaceBetween: 0,
            speed: 800,
            breakpoints: {
                744: {
                    // slidesPerView: 3,
                    slidesPerView: 'auto',
                }
            },
            pagination: {
                el: '.js-stage-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
}

const countrySlider = () => {
    if(document.querySelector('.js-country-swiper')){
        const countrySwiper = new Swiper('.js-country-swiper', {
            modules: [Navigation, Pagination, Grid],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            // grabCursor: true,
            // slideToClickedSlide: true,
            // slidesPerView: 1.5,
            slidesPerView: 3,
            spaceBetween: 8,
            // spaceBetween: 0,
            speed: 800,
            grid: {
                rows: 4,
                fill: "row",
                // fill: "column",
            },
            pagination: {
                el: '.js-country-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
}

const suppliesSlider = () => {
    if(document.querySelector('.js-country-swiper')){
        const countrySwiper = new Swiper('.js-country-swiper', {
            modules: [Navigation, Pagination, Grid],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            // grabCursor: true,
            // slideToClickedSlide: true,
            // slidesPerView: 1.5,
            slidesPerView: 3,
            spaceBetween: 8,
            // spaceBetween: 0,
            speed: 800,
            grid: {
                rows: 4,
                fill: "row",
                // fill: "column",
            },
            pagination: {
                el: '.js-country-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
}

const faqAccordion = () => {
    const faqList = document.querySelectorAll('.js-faq-item')
    if(faqList.length){
        faqList.forEach(item => item.addEventListener('click', (e)=> {
            let target = e.target
            if(target.closest('.faq__item-head')){
                let text = target.closest('.faq__item').querySelector('.faq__item-toggler')
                if(item.classList.contains('faq__item--open')){
                    item.classList.remove('faq__item--open')
                    text.style.maxHeight = 0
                } else {
                    item.classList.add('faq__item--open');
                    text.style.maxHeight = text.scrollHeight + 'px';
                }
            }
        }))
    }
}

window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth < 1170) {
        // Tariff init
        tariffSlider()

        // Stage init
        stageSlider()
    }
    if(document.documentElement.clientWidth < 744) {
        // Country init
        countrySlider()
    }
})

document.addEventListener('DOMContentLoaded', ()=>{

    // Burger init
    burger()

    if(document.documentElement.clientWidth < 744) {
        // Country init
        countrySlider()
    }
    if(document.documentElement.clientWidth < 1170) {
        // Tariff init
        tariffSlider()

        // Stage init
        stageSlider()


    }

})