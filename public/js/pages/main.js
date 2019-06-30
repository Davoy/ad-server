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
		$('.contactLocationInsert').text(response.doc.location);
		$('.aboutPhoneInsert').text(response.doc.phone);
		$('.contactPhoneInsert').text(response.doc.phone);
		$('.contactEmailInsert').text(response.doc.email);
		$('.aboutBioInsert').html(response.doc.about);
		let html = '';
		response.doc.skills.forEach((skill)=>{
			html += `
				<div class="col-md-6">
					<span>${skill.title}</span> 
					<small class="pull-right">${new Date().getFullYear()-skill.year}yrs</small>
					<div class="progress">
							<div class="progress-bar" role="progressbar" style="width: ${(new Date().getFullYear()-skill.year)/10 * 100}%;" aria-valuenow="${(new Date().getFullYear()-skill.year)/10}" aria-valuemin="0"aria-valuemax="100">                                    
							</div>
					</div>
				</div>
			`;
		});
		$('.aboutSkillsInsert').html(`<div class="row">${html}</div>`);
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
			let initialImage = '';
			doc.images.split(/\s*,\s*/g).forEach((image, idx)=>{
				if(idx == 0){
					initialImage = `<a href="${image}" data-lightbox="${doc.title}-mf" data-title="${doc.description}">`;
				}
				else{
					gallery += `
						<a href="${image}" data-lightbox="${doc.title}-mf" data-title="${doc.description}"></a>
					`;
				}
			});
			html += `
				<div class="col-md-4">
					<div class="work-box">
							${initialImage}
								<div class="work-img">
										<img src="${doc.images.split(/\s*,\s*/g)[0]}" alt="" class="img-fluid">
								</div>
							</a>
							<div class="work-content">
									<div class="row">
											<div class="col-sm-12">
													<h2 class="w-title mb-0">${doc.title}</h2>${ !doc.videoLink || doc.videoLink == '' ? '':`<small><a href='${doc.videoLink}'>Video Demo</a></small>`}
													<div class="w-more">
															<span class="w-ctegory">${doc.tag}</span> / <span class="w-date">${date.toDateString()}</span>
													</div>
											</div>
									</div>
							</div>
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

	// SEND EMAIL
	$('button.contactForm').on('click', (event)=>{
		event.preventDefault();
		if(($('input[name=name]').val() == '' || $('input[name=email]').val() == '' || $('input[name=subject]').val() == '' || $('textarea[name=message]').val() == '')){
			$('#warningmessage').toggleClass('d-none');
			setTimeout(()=>{
				$('#warningmessage').toggleClass('d-none');
			}, 3000);
		}else{
			$.post('/send-mail', {
				name: $('input[name=name]').val(),
				email: $('input[name=email]').val(),
				subject: $('input[name=subject]').val(),
				message: $('textarea[name=message]').val()
			}, (resp)=>{
				if(resp.error){				
					$('#errmessage').toggleClass('d-none');
					setTimeout(()=>{
						$('#errmessage').toggleClass('d-none');
					}, 3000);
				}else{
					$('#successmessage').toggleClass('d-none');
					setTimeout(()=>{
						$('#successmessage').toggleClass('d-none');
					}, 3000);
					$('input[name=name]').val('');
					$('input[name=email]').val('');
					$('input[name=subject]').val('');
					$('textarea[name=message]').val('');
				}
			});
		}
	});
})(jQuery);