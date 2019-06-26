(function ($) {
	"use strict";
	// home data
	$.get('/home', (response)=>{
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
	$.get('/about', (response)=>{
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

	// services
	$.get('/services', (response)=>{
		let html = '';
		response.docs.forEach((doc)=>{
			html += `
				<div class="col-md-4">
					<div class="service-box">
						<div class="service-ico">
							<span class="ico-circle"><i class="${doc.icon}"></i></span>
						</div>
						<div class="service-content">
							<h2 class="s-title">${doc.title}</h2>
							<p class="s-description text-center">${doc.description}</p>
						</div>
					</div>
				</div>\n
			`;
		});
		$('.servicesInsert').html(html);
	});

	// Projects
	$.get('/projects', (response)=>{
		let html = '';
		response.docs.forEach((doc)=>{
			let date = new Date(doc.date);
			let gallery = '';
			doc.images.split(/\s*,\s*/g).forEach((image)=>{
				gallery += `
					<a href="${image}" data-lightbox="${doc.title}-mf" data-title="${doc.description}\n<a href=''>Video Demo Available Here</a>" hidden></a>
				`;
			});
			html += `
				<div class="col-md-4">
					<div class="work-box">
							<a href="${doc.images.split(/\s*,\s*/g)[0]}" data-lightbox="${doc.title}-mf" data-title="${doc.description}<br><a href=''>Video Demo Available Here</a>">
									<div class="work-img">
											<img src="${doc.images.split(/\s*,\s*/g)[0]}" alt="" class="img-fluid">
									</div>
									<div class="work-content">
											<div class="row">
													<div class="col-sm-12">
															<h2 class="w-title">${doc.title}</h2>
															<div class="w-more">
																	<span class="w-ctegory">${doc.tag}</span> / <span class="w-date">${date.toDateString()}</span>
															</div>
													</div>
											</div>
									</div>
							</a>
							${ gallery }
					</div>
				</div>  
			`;
		});
		$('.projectsInsert').html(html);
	});

	// Counters
	$.get('/counters', (response)=>{
		let html = '';
		response.docs.forEach((doc)=>{
			html += `
				<div class="col-sm-3 col-lg-3">
					<div class="counter-box counter-box pt-4 pt-md-0">
						<div class="counter-ico">
							<span class="ico-circle"><i class="${doc.icon}"></i></span>
						</div>
						<div class="counter-num">
							<p class="counter">${doc.count}</p>
							<span class="counter-text">${doc.title}</span>
						</div>
					</div>
				</div>\n
			`;
		});
		$('.countersInsert').html(html);
		/*--/ Star Counter /--*/
		$('.counter').counterUp({
			delay: 15,
			time: 2000
		});
	});

	// Testimonials
	$.get('/testimonials', (response)=>{
		let html = '';
		response.docs.forEach((doc)=>{
			html += `
				<div class="testimonial-box">
					<div class="author-test">
						<img src="${doc.image}" alt="" class="rounded-circle b-shadow-a">
						<span class="author">${doc.name}</span>
					</div>
					<div class="content-test">
						<p class="description lead">
							<span class="border border-light rounded-circle p-1"><i class="fa fa-quote-left"></i></span>
							${doc.message}
							<span class="border border-light rounded-circle p-1"><i class="fa fa-quote-right"></i></span>
						</p>
					</div>
				</div>
			`;
		});
		$('#testimonial-mf').html(html);
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
	});
})(jQuery);