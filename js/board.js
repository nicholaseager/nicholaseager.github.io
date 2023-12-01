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

		// Loading state
		$('body').addClass('loading');
		$('.header').removeClass('light');
		$('.header').addClass('dark');

		// Load the page
		$('.page-loader').load( state.hash + ' .page__content', function() {
			// Scroll to top
			$('html, body').animate({ scrollTop: 0 }, 'slow');

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

	$(document).on('click', 'a', function (event){
		// Don't follow link
		event.preventDefault();

		// Get the link target
		var thisTarget = $(this).attr('href');

		if ( !thisTarget ) {
			// Let JS handle it
		}

		// If we clicked an anchor
		else if (thisTarget.indexOf('#') >= 0) {
			// Scroll to link
			var offset = 100;
			var target = $(thisTarget).offset().top - offset;
			$('html, body').animate({ scrollTop: target }, 500);
		}

		// If we clicked mailto/tel
		else if (thisTarget.indexOf('mailto:') >= 0 || thisTarget.indexOf('tel:') >= 0) {
			// Use the given link
			window.location = thisTarget;
		}

		// If link is handled by some JS action – e.g. galleries
		else if ( $(this).is('.image-gallery-link') ) {
			// Let JS handle it
		}

		// If link has overriden on click
		else if ( $(this).attr('onclick') ) {
			// Let JS handle it
		}

		// If link is external
		else if ( thisTarget.indexOf('http') >= 0 ) {
			// Go to the external link
			window.open(thisTarget, '_blank');
		}

		// If link is internal
		else {

			// If we are using ajax loading, push history state.
			// Otherwise just use the link.
			if ( $('body').hasClass('ajax-loading') ) {
				// Change navTarget
				navTarget = thisTarget;
				
				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			} else {
				// Use the given link
				window.location = thisTarget;
			}
		}

	});

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Helpers

	function isScrolledIntoView(elem, offset=0) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top - offset;
		var elemBottom = elemTop + $(elem).height() + offset;

		return ((elemTop <= docViewBottom) && (elemBottom >= docViewBottom)) ||
				((elemBottom >= docViewTop) && (elemTop <= docViewTop)) ||
				((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

		// Wait until first image has loaded
		$('.page__content').find('img:first').imagesLoaded( function() {

			// Show the content
			$('body').removeClass('loading');

			// Update header after loading animation delay
			setTimeout(function() {
				var style = $('.page__content').attr('data-header-style');
				$('.header').attr('class', 'header ' + style);
			}, 150);

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

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Single Line Swipers

		var singleSwiperID = 0;
		$('.single-line-swiper-container').each( function() {
			// Get swiper element
			var $this = $(this);

			// We need to manually hook up the swiper navigation/pagination elements
			// because they are outside of the swiper contianer.
			var swiperID = 'swiper-' + singleSwiperID.toString();
			$this.find('.swiper').attr('data-id', swiperID);
			$this.find('.swiper-pagination-outside').attr('data-id', swiperID);
			$this.find('.swiper-button-next-outside').attr('data-id', swiperID);
			$this.find('.swiper-button-prev-outside').attr('data-id', swiperID);
			singleSwiperID += 1;

			const setBreakpoints = $this.hasClass('show-multiple-slides');

			const breakpoints = {
				480: {
					slidesPerView: 1,
					spaceBetween: 10
				},
				960: {
					slidesPerView: 2,
					spaceBetween: 10
				},
				1440: {
					slidesPerView: 3,
					spaceBetween: 15
				}
			};

			const singleLineSwiper = new Swiper('.single-line-swiper[data-id="' + swiperID + '"]', {
				// Optional parameters
				direction: 'horizontal',
				slidesPerView: 'auto',
				spaceBetween: 10,
				autoHeight: true,
				centerInsufficientSlides: true,
				loop: false,
	
				pagination: {
					el: '.swiper-pagination-outside[data-id="' + swiperID + '"]',
					type: 'bullets',
				},
			
				navigation: {
					nextEl: '.swiper-button-next-outside[data-id="' + swiperID + '"]',
					prevEl: '.swiper-button-prev-outside[data-id="' + swiperID + '"]'
				},

				breakpoints: setBreakpoints ? breakpoints : {}
			});
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Gear Lists

		$('.gear-wrap').each( function() {
			var gallery = $(this).find('.gear-gallery');
			var buttons = $(this).find('.gear-buttons');

			function updateElements(tag) {
				if (tag == "all") tag = "";

				gallery.children('.gear-gallery-image').each(function () {
					$(this).removeClass('show');
					if ($(this).attr('class').indexOf(tag) > -1) {
						$(this).addClass('show');
					}
				});
			}

			buttons.find('.button').click(function(event) {
				// Update tag
				var tag = $(this).attr('data-tag');
				$("#gear-gallery").fadeOut("fast", function () {
					updateElements(tag);
					$("#gear-gallery").fadeIn("slow");
				});
				
				// Update active
				var current = buttons.find('.active');
				current.removeClass('active');
				$(this).addClass('active');

				event.preventDefault();
			});

			// Show all items by default
			updateElements("all")
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Swipers

		$('.order-swiper').each(function() {
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


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Maps

		$('.google-map').each( function() {
			$(this).find('.map-notice-button').click(function(){
				$(".map-notice-button").toggle();
				$(".modal").fadeIn();
			});

			$(this).find('.map-modal-confirm-button').click(function(){
				$(".map-overlay").fadeOut();
			});

			$(this).find('.map-modal-decline-button').click(function(){
				$(".map-overlay").fadeOut();
			});
		});


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

		$('.single table').each(function () {
			$(this).wrapAll('<div class="table-wrap"></div>');
		});

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Lazy iframes

		function loadFrames() {
			$('iframe').each(function () {
				var $this = $(this);
				var id = $this.attr('id');
				if (id && id.startsWith("lazyframe")) {
					if (isScrolledIntoView($this, 50)) {
						// Remove srcdoc containing background and load button
						$this.removeAttr("srcdoc");

						// Replace the iframe source with the intended source
						// This method avoids an issue with the window history duplicates
						(this.contentWindow || this.documentWindow).location.replace($this.attr('data-src'));

						// Remove the lazy id so this doesn't happen again
						$this.attr('id', id.replace('lazyframe', ''));
					}
				}
			});
		}

		loadFrames();
		$(window).bind('scroll', loadFrames);

		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Auto TOC

		$('.table-of-contents-container').each( function() {
			var $this = $(this);
			var $toc_content = $this.find('.table-of-contents-content');
			var $toc = $this.find('#table-of-contents').find('.toc-list');

			$toc_content.children("h2").map(function () {
				var header = $(this);
				var text = header.text();
				var id = text.toLowerCase().replaceAll(" ", "-").replace(/[^a-zA-Z- ]/g, "");

				header.attr("id", id);

				$toc.append('<li data-id="' + id + '" class="toc-item"><a class="scrollto toc-link" href="#' + id + '">' + text + '</a></li>');
			});

			// Sticky
			var sticky = $this.find('.toc-sticky');
			if (sticky) {
				const content = $('.table-of-contents-container');
				const sections = $(".table-of-contents-content h2");
				const tocItems = $(".toc-item");

				function updateSticky() {
					function setCurrentItem() {
						const scrollPos = $(window).scrollTop() + 150;
					  
						let activeSection = undefined;
						sections.each(function() {
						  if ($(this).offset().top <= scrollPos) {
							activeSection = $(this);
						  }
						});
					  
						if (activeSection) {
							tocItems.removeClass("highlighted");
					  
							tocItems.each(function() {
								if ($(this).attr("data-id") === activeSection.attr("id")) {
									$(this).addClass("highlighted");
								}
							});
						}
					  }

					const contentTop = content.offset().top - 150;
					if ($(window).scrollTop() > contentTop) {
						sticky.addClass("stick");
					} else {
						sticky.removeClass("stick");
					}

					setCurrentItem();
				}
				$(window).bind('scroll', updateSticky);

				sticky.click(function() {
					sticky.toggleClass("open");
				});
			}
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
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Comment Form

	// Override the submit event
	$(document).on('submit', '#comment-form', function (e) {

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
	
}(jQuery));