$(document).ready(function () {
// ===============================================================
//FORMS
function forms(){
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}else{
				this.value = $(this).attr('data-value');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				if(!$(this).hasClass('l')){
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
			if($(this).hasClass('vn')){
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});
}
forms();

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
	var er=0;
	var form=$(this).parents('form');
	var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError_s(form);
		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
	var er=0;
	var form=input.parents('form[name="review"]');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-\s]+$/.test(input.val()))){
			er++;
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
	return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
	input.addClass('err');
	// input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
	var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormError_s(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove(); 
}
// ===============================================================
	if($(window).width() <= 900) {
		$('meta[name="viewport"]').remove();  
		$('head').append( '<meta name="viewport" content="width=900, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
	}
	window.addEventListener("resize", function() {
		$('.label').text($(window).width());
		$('.label').append('&nbsp;');
		if($(window).width() <= 900) {
			if ($('meta[name=viewport]').is('[content^="width=device-width"]')) {
				$('meta[name=viewport]').remove();
				$('head').append( '<meta name="viewport" content="width=900, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
			}
		}
		else {
			if ($('meta[name=viewport]').is('[content^="width=900"]')) {
				$('meta[name=viewport]').remove();
				$('head').append( '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">' );
			}
		}
	}, false);
// =====================================
	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('.img_bg').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
				$(this).find('.img_bg').css('display','none');
			}
		});
	}
	ibg();  
// =====================================

  $('.navigation__item a').click(function(){
	$(this).parents('.navigation-list').find('.navigation__item').removeClass('active');
	$(this).parent().addClass('active');
	return false
  });

  $('.footer-menu__item a').click(function(){
	$(this).parents('.footer-menu').find('.footer-menu__item').removeClass('active');
	$(this).parent().addClass('active');
	return false
  });
	$(function() {
		$.fn.scrollToTop = function() {
			$(this).hide().removeAttr("href");
			if ($(window).scrollTop() >= "500")
				$(this).fadeIn("slow")
			
			var scrollDiv = $(this)
			$(window).scroll(function() {
				if ($(window).scrollTop() <= "500")
					$(scrollDiv).fadeOut("slow")
				else $(scrollDiv).fadeIn("slow")
			})
			
			$(this).click(function() {
				$("html, body").animate({scrollTop: 0}, "slow")
			})
		}   
	})   

	$(function() {
		$("#go-top").scrollToTop()
		console.log(window.innerHeight)
	})

// slider-banner
  var mySwiper = new Swiper('.slider-banner', {
	  // roundLengths: true,
	  slidesPerView: 1,
	  speed: 2000,
	  loop: true,
	  navigation: {
		nextEl: '.forward',
		prevEl: '.backward',
	  },
  }); 
// var mySwiper = new Swiper('.slider-banner');
//   $('.forward').on('click', function(){
//       mySwiper.navigation.nextEl;
//   });
//   $('.backward').on('click', function(){
//       mySwiper.navigation.prevEl;
//   });
// slider-banner end

//////////////////////////////////
//////////////////////////////////

// slider-recent
  var recentSwiper = new Swiper('.slider-recent', {
	slidesPerView: 4,
	// roundLengths: true,
	spaceBetween: 19,
	freeMode: false,
	speed: 1500,
	navigation: {
		nextEl: '#recent-forward',
		prevEl: '#recent-backward',
	},
	loop: true,
  });
  // var recentSwiper = new Swiper('.slider-recent');
  // $('#recent-forward').on('click', function(){
  //     recentSwiper.navigation.nextEl;
  // });
  // $('#recent-backward').on('click', function(){
  //     recentSwiper.navigation.prevEl;
  // });


// slider-recent end


// var featuredSwiper = new Swiper('.swiper-container');
//   $('.forward').on('click', function(){
//       mySwiper.navigation.nextEl;
//   });
//   $('.backward').on('click', function(){
//       mySwiper.navigation.prevEl;
//   });

// slider-featured
  var featuredSwiper = new Swiper('.slider-featured', {
	loop: true,    
	slidesPerView: 4,
	spaceBetween: 19,
	freeMode: false,
	speed: 1500,
	navigation: {
		nextEl: '#featured-forward',
		prevEl: '#featured-backward',
	},
  });


	// var featuredSwiper = document.querySelector('#featured-slider').swiper;
	//     $('#featured-slider').hover(function(){
	//          featuredSwiper.autoplay.stop();
	//     }, function(){
	//          featuredSwiper.autoplay.start();
	//     });

	// var newSwiper = document.querySelector('#new-slider').swiper;
	//     $('#new-slider').hover(function(){
	//          newSwiper.autoplay.stop();
	//     }, function(){
	//          newSwiper.autoplay.start();
	//     });

// slider tesimonials
// var testimonialsSwiper = new Swiper('.testimonials-slider', {
//   fadeEffect: { crossFade: true },
//   virtualTranslate: true,
//   autoplay: {
//       delay: 8000,
//       disableOnInteraction: false,
//   },
//   speed: 1500, 
//   slidersPerView: 1,
//   effect: "fade",
//   pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
// });

});