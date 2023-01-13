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

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		// If there's a gallery
		$('.gallery').each( function() {

			const gallerySwiper = new Swiper('.image-gallery-swiper', {
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

			// Get gallery element
			var $this = $(this);

			// Get image gallery
			var $image_gallery = $this.find('.image-gallery');

			// Wait for images to load
			$image_gallery.imagesLoaded( function() {		
				$image_gallery.find('.image-gallery-link').click(function(event) {
					var id = $(this).attr('data-index');
					gallerySwiper.slideTo(parseInt(id), 0);
					
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

		$('iframe').each(function () {
			var $this = $(this);
			var id = $(this).attr('id');
			if (id && id.startsWith("lazyframe")) {
				setTimeout(function () {
					$this.contents().find('#loadbutton').click();
				}, 3000);
			}
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Auto TOC

		$('.guide-content').each( function() {
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
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
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
	
	
	
}(jQuery));