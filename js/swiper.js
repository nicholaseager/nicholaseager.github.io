import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'

const singleSlideSwiper = new Swiper('.swiperSingle', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    autoHeight: true,
    preloadImages: false,

    autoplay: {
        delay: 5000,
    },

    lazy: {
        loadPrevNext: true,
    },
});

const dynamicSlideSwiper = new Swiper('.swiperDynamic', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    preloadImages: false,

    autoplay: {
        delay: 5000,
    },

    lazy: {
        loadPrevNext: true,
    },
    breakpoints: {
        480: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

const collectionSwiper = new Swiper('.swiperCollection', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    autoHeight: true,

    autoplay: {
        delay: 5000,
    },

    lazy: {
        loadPrevNext: true,
    },
    breakpoints: {
        480: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 5
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 10
        }
    }
});