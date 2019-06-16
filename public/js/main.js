(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	// LOAD HOME DATA ADN START TYPINGS
	// home data
	$.get('/api/home', (response)=>{
		$('.homeHeadlineInsert').text(response.doc.headline);
		$('.homeTypingsInsert').html(response.doc.typings.join(', '));
		if ($('.text-slider').length == 1) {
			var typed_strings = $('.text-slider-items').text();
			var typed = new Typed('.text-slider', {
					strings: typed_strings.split(','),
					typeSpeed: 80,
					loop: true,
					backDelay: 1100,
					backSpeed: 30
			});
		}
	});

	// about data
		$.get('/api/about', (response)=>{
			$('.aboutImageInsert').attr('src',response.doc.image);
			$('.aboutNameInsert').text(response.doc.name);
			$('.aboutProfessionInsert').text(response.doc.profession);
			$('.aboutEmailInsert').text(response.doc.email);
			$('.contactLocationInsert').text(response.doc.email);
			$('.aboutPhoneInsert').text(response.doc.phone);
			$('.contactPhoneInsert').text(response.doc.phone);
			$('.contactEmailInsert').text(response.doc.location);
			$('.aboutBioInsert').html(response.doc.about);
			let html = '';
			response.doc.skills.forEach((skill)=>{
				html += `
					<span>${skill.title}</span> <small class="pull-right">${new Date().getFullYear()-skill.year}yrs</small>
					<div class="progress">
							<div class="progress-bar" role="progressbar" style="width: ${(new Date().getFullYear()-skill.year)/10 * 100}%;" aria-valuenow="${(new Date().getFullYear()-skill.year)/10}" aria-valuemin="0"aria-valuemax="100">                                    
							</div>
					</div>\n
				`;
			});
			$('.aboutSkillsInsert').html(html);
			html = '';
			response.doc.socials.forEach((social)=>{
				html += `
					<li>
						<a href="${social.url}"><span class="ico-circle"><i class="${social.icon}"></i></span></a>
					</li>
				`;
			});
			$('.contactSocialsInsert').html(html);
		});
})(jQuery);