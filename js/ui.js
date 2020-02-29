'use strict';

/* VARS */
var width = $(window).width();
var mqMobile = window.matchMedia('(max-width: 47.9375em)');
var mqTablet = window.matchMedia('(max-width: 61.8125em)');
var mqTabletPortrait = window.matchMedia( '(min-width: 48em)' );

// CANVAS
var canvas, stage, exportRoot;

/* DOCUMENT LOAD */

$(window).load(function() {
	if ($('canvas').length > 0) {
		initCanvas();
	}
});

/* DOCUMENT READY */

$(document).ready(function() {

	// Banner animation
	$('.page').fadeIn(1300);
	$('.bg-banner-text').fadeIn(1800, function(){
		$('.banner .title span').typed({
			strings: ['Susana<br>Taranco'],
			typeSpeed: 100,
			startDelay: 0,
			contentType: 'html',
			callback: function() {
				$('.banner .link').addClass('active');
			},
		});
	});

	//Paralax
	//parallax('.banner',3,'translate');
	parallax('.banner-project',3,'translate');

	$(document).bind('scroll', function() {
		//parallax('.banner',3,'translate');
		parallax('.banner-project',3,'translate');
	});

	// Scrollr
	if (!$('html').hasClass('touch')) {
		if ($('.works').length > 0) {
			var s = skrollr.init({
			    easing: 'linear',
			    smoothScrollingDuration: 1
			});
		}
	}
	
	// Remove # from href
	$( document ).on('click', 'a', function(event) {
		var ahref = $(this).attr('href');
		if(ahref=="#"){
			event.preventDefault(); 
		}
	});


	//Margin-top Banner Project
	contentMarginTop();

	$( window ).resize(function() {
	  contentMarginTop();

	});

	//Waypoint Main
	var waypointMain = new Waypoint({
		element: document.getElementById('main'),
		handler: function(direction) {
			$('.banner .title').toggleClass('transparent');
			$('.banner .link').toggleClass('transparent');
			$('.banner .bg-banner-text').toggleClass('transparent');
		}, 
		offset: '100px'
	});

	//Waypoint About
	var waypointAbout = new Waypoint({
		element: document.getElementById('about'),
		handler: function(direction) {
			$('.about').toggleClass('active');
		},
  		offset: '60%'
	});

	var waypointFooter = new Waypoint({
		element: document.getElementById('footer'),
		handler: function(direction) {
			$('.footer').toggleClass('active');
		},
  		offset: '90%'
	});

	//Canvas animated
	if ($('canvas').length > 0) {
		var waypointCanvas = new Waypoint({
			element: document.getElementById('canvas'),
			handler: function(direction) {
				exportRoot.play(1);
			},
	  		offset: '50%' 
		});
	}

	//GoTo Portfolio
	$( document ).on( 'click', '.goto-portfolio', function() {
		if ($('.main-nav').hasClass('active')) {
			showPortfolio();

			setTimeout(function(){
				hideMenu();
			}, 1500);
		} else {
			showPortfolio();
		}
	});

	//GoTo about
	$( document ).on( 'click', '.goto-about', function() {
		scrollToElement($('#about'), 0);
	});
});

/* FUNCTIONS */

//Scroll to
function scrollToElement(element, offset) {
    var target = element;
 
    $('html,body').animate({
        scrollTop: target.offset().top - offset
    }, 500);
 
    return false;
}

//Margin-top banner project
function contentMarginTop() {
	var bannerProjectH = $('.banner-project').height();

	$('.project .content').css('margin-top',bannerProjectH);
}

//canvas
function initCanvas() {
	canvas = document.getElementById("canvas");
	exportRoot = new lib.alu();

	stage = new createjs.Stage(canvas);
	stage.addChild(exportRoot);
	stage.update();

	createjs.Ticker.setFPS(lib.properties.fps);
	createjs.Ticker.addEventListener("tick", stage);
}

// Parallax
function parallax(element,divider,mode) {
	if (!$('html').hasClass('touch')) {
		if (!mqMobile.matches) {
			$(element).each(function() {
				var speed = 0.5;
				var windowYOffset = -window.pageYOffset;
				var parallaxPosition = windowYOffset * speed;

				if (mode == 'translate') {
					$(this).css({transform: 'translateY('+parallaxPosition/divider+'px)'});
				} else if (mode == 'background') {
					$(this).css({backgroundPosition: '0px '+parallaxPosition/divider+'px'});
				}

				if($(this).hasClass('item')) {
					$(this).find('.item-content').css({transform: 'translateY('+parallaxPosition/4+'px)'});
				}
			});
		} else {
			if (mode == 'translate') {

					$(this).css({transform: 'translateY(0)'});

				} else if (mode == 'background') {

					$(this).css({backgroundPosition: '0px 0px'});
				}
		}
	}
}
