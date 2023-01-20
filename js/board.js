(function ($) {
	'use strict';



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;

	// State change event
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		// console.log(state);

		// Loading state
		$('body').addClass('loading');

		// Load the page
		$('.page-loader').load( state.hash + ' .page__content', function() {

			// Scroll to top
			$( 'body, html' ).animate({
				scrollTop: 0
			}, 300);

			// Find transition time
			var transitionTime = 400;

			// After current content fades out
			setTimeout( function() {

				// Remove old content
				$('.page .page__content').remove();

				// Append new content
				$('.page-loader .page__content').appendTo('.page');

				// Set page URL
				$('body').attr('data-page-url', window.location.pathname);

				// Update navTarget
				navTarget = $('body').attr('data-page-url');

				// Set page title
				docTitle = $('.page__content').attr('data-page-title');
				document.title = docTitle;

				// Run page functions
				pageFunctions();

			}, transitionTime);

		});

	});


	// On clicking a link

	if ( $('body').hasClass('ajax-loading') ) {

		$(document).on('click', 'a', function (event){

			// Don't follow link
			event.preventDefault();

			// Get the link target
			var thisTarget = $(this).attr('href');

			// If we don't want to use ajax, or the link is an anchor/mailto/tel
			if ($(this).hasClass('js-no-ajax') || thisTarget.indexOf('#') >= 0 || thisTarget.indexOf('mailto:') >= 0 || thisTarget.indexOf('tel:') >= 0) {

				// Use the given link
				window.location = thisTarget;
			}

			// If link is handled by some JS action – e.g. fluidbox
			else if ( $(this).is('.gallery__item__link') ) {
				
				// Let JS handle it
			}

			// If link is external
			else if ( thisTarget.indexOf('http') >= 0 ) {

				// Go to the external link
				window.open(thisTarget, '_blank');

			}

			// If link is internal
			else {

				// Change navTarget
				navTarget = thisTarget;
				
				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			}

		});
		
	}

	$(document).on('click', '.scrollto', function (event){
		var id = $(this).attr("href");
		if (id) {
			var offset = 30;
			var target = $(id).offset().top - offset;
			$('html, body').animate({ scrollTop: target }, 500);
			event.preventDefault();
		}
	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Helpers

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

		// Wait until first image has loaded
		$('.page__content').find('img:first').imagesLoaded( function() {

			// Show the content
			$('body').removeClass('loading');

			// Hide the menu
			$('body').removeClass('menu--open');
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

		// Switch active link states
		$('.active-link').removeClass('active-link');

		$('a[href="' + navTarget + '"]').addClass('active-link');

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Main Video Source Switching

		var mainVideo = $('video#homeVideo');
		var mobileSrc = "https://ik.imagekit.io/qn1gkawvy/home-intro-low.mp4";
		var desktopSrc = "https://ik.imagekit.io/qn1gkawvy/home-intro.mp4";
		
		if ($(window).width() < 980) {
			mainVideo.append("<source type='video/mp4' src='" + mobileSrc + "' />");
		} else {
			mainVideo.append("<source type='video/mp4' src='" + desktopSrc + "' />");
		}

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Swipers

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

		const orderSwiperThumbs = new Swiper(".order-swiper-thumbs", {
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});

		const orderSwiper = new Swiper('.order-swiper', {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			autoHeight: true,
		
			autoplay: {
				delay: 5000,
			},

			lazy: {
				loadPrevNext: true,
			},

			thumbs: {
				swiper: orderSwiperThumbs,
			},
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		var galleryID = 0;

		// If there's a gallery
		$('.gallery').each( function() {
			// Get gallery element
			var $this = $(this);

			var swiperID = 'swiper-' + galleryID.toString();
			$this.find('.swiper').attr('data-id', swiperID);
			galleryID += 1;

			// Get image gallery
			var $image_gallery = $this.find('.image-gallery');

			// Create a unique swiper for each gallery
			const gallerySwiper = new Swiper('.image-gallery-swiper[data-id="' + swiperID + '"]', {
				direction: 'horizontal',
				loop: true,
			
				lazy: {
					loadPrevNext: true,
				},
			
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
				},
			
				keyboard: {
					enabled: true,
					onlyInViewport: false,
				},
			
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

			// Wait for images to load
			$image_gallery.imagesLoaded( function() {
				// Update order button on slide change
				const onIndexChange = function (index) {
					var $slide = $this.find('.swiper-slide[data-swiper-slide-index="' + index + '"]');
					var src = $slide.attr('data-src');
					var printButton = $this.find('.order-prints');
					var link = printButton.attr('data-prefix') + src;
					printButton.attr('href', link);
				}
				gallerySwiper.on('slideChange', () => {
					onIndexChange(gallerySwiper.realIndex);
				});

				$image_gallery.find('.image-gallery-link').click(function(event) {
					var id = $(this).attr('data-index');
					var index = parseInt(id);
					gallerySwiper.slideTo(index, 0);
					onIndexChange(index - 1);
					
					// Get container
					var $swiper = $this.find('.image-gallery-swiper-container');
					$swiper.removeClass('image-gallery-swiper-hidden');

					event.preventDefault();
				});
			});

			// Close button
			var $close = $this.find('.swiper-close-button');
			$close.click(function(event) {
				// Get container
				var $swiper = $this.find('.image-gallery-swiper-container');
				$swiper.addClass('image-gallery-swiper-hidden');

				event.preventDefault();
			});
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Collections

		var collectionID = 0;

		// If there's a gallery
		$('.swiper-collection-container').each( function() {
			// Get collection element
			var $this = $(this);

			// We need to manually hook up the swiper navigation/pagination elements
			// because they are outside of the swiper contianer.
			var swiperID = 'swiper-' + collectionID.toString();
			$this.find('.swiper').attr('data-id', swiperID);
			$this.find('.swiper-pagination-outside').attr('data-id', swiperID);
			$this.find('.swiper-button-next-outside').attr('data-id', swiperID);
			$this.find('.swiper-button-prev-outside').attr('data-id', swiperID);
			collectionID += 1;

			const collectionSwiper = new Swiper('.swiper-collection[data-id="' + swiperID + '"]', {
				// Optional parameters
				direction: 'horizontal',
				loop: false,
				autoHeight: true,
			
				lazy: {
					loadPrevNext: true,
				},
	
				pagination: {
					el: '.swiper-pagination-outside[data-id="' + swiperID + '"]',
					type: 'bullets',
				},
			
				navigation: {
					nextEl: '.swiper-button-next-outside[data-id="' + swiperID + '"]',
					prevEl: '.swiper-button-prev-outside[data-id="' + swiperID + '"]'
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
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

		$('.single p > img').each( function() {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

		// For each iframe
		$('.single iframe').each( function() {
			var width = $(this).attr('width');
			var height = $(this).attr('height');
			var ratio = (height/width)*100;

			// Wrap in video container
			$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

		$('.single table').each(function () {
			$(this).wrapAll('<div class="table-wrap"></div>');
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Lazy iframes

		function loadFrames(inViewportOnly) {
			$('iframe').each(function () {
				var $this = $(this);
				var id = $this.attr('id');
				if (id && id.startsWith("lazyframe")) {
					if (!inViewportOnly || isScrolledIntoView($this)) {
						$this.removeAttr("srcdoc");
						$this.attr('src', $this.attr('data-src'));
						$this.attr('id', id.replace('lazyframe', ''));
					}
				}
			});
		}

		loadFrames(true);
		setTimeout(function () {
			loadFrames(false);
		}, 5000);

		$(window).bind('scroll', () => loadFrames(true));

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Auto TOC

		$('.table-of-contents-container').each( function() {
			var $this = $(this);
			var $toc_content = $this.find('.table-of-contents-content');
			var $toc = $this.find('#table-of-contents').find('ol');

			$toc_content.children("h2").map(function () {
				var header = $(this);
				var text = header.text();
				var id = text.toLowerCase().replaceAll(" ", "-").replace(/[^a-zA-Z- ]/g, "");

				header.attr("id", id);

				$toc.append('<li><a class="scrollto" href="#' + id + '">' + text + '</a></li>');
			});
		});
	}

	// Run functions on load
	pageFunctions();


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

	$(document).on('click', '.js-menu-toggle', function (){

		// If already open
		if ( $('body').hasClass('menu--open') ) {
			$('body').removeClass('menu--open');
		}

		// If not open
		else {
			$('body').addClass('menu--open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function (){

		// If menu is open when you click a link on mobile
		if ( $('.menu').hasClass('menu--open') ) {
			$('.menu').removeClass('menu--open');
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.eager-form__item--error').removeClass('eager-form__item--error');

		// Get form elements
		var emailField = $('.eager-form__input[name="email"]');
		var nameField = $('.eager-form__input[name="name"]');
		var messageField = $('.eager-form__textarea[name="message"]');
		var gotchaField = $('.eager-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.eager-form__item').addClass('eager-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.eager-form__item').addClass('eager-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.eager-form__item').addClass('eager-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Order Form

	// Override the submit event
	$(document).on('submit', '#order-form', function (e) {

		// Clear previous classes
		$('.eager-form__item--error').removeClass('eager-form__item--error');

		// Get form elements
		var emailField = $('.eager-form__input[name="email"]');
		var nameField = $('.eager-form__input[name="name"]');
		var gotchaField = $('.eager-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.eager-form__item').addClass('eager-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.eager-form__item').addClass('eager-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( 	emailField.val() !== '' &&
				nameField.val() !== '' &&
				gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});
	
	
	
}(jQuery));