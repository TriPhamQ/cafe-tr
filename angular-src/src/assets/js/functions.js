$(window).scroll(function(){

  if (window.location == "http://localhost:3000/") {

    var wScroll = $(this).scrollTop();

    $('.logo').css({
      'transform' : 'translate( '+ wScroll /8 +'%, '+ wScroll /8 +'%)'
    });

    $('.back-img').css({
      'transform' : 'translate(0px, '+ wScroll /2 +'%)'
    });

    $('.fore-img').css({
      'transform' : 'translate(0px, -'+ wScroll /40 +'%)'
    });

    if(wScroll > $('.home-items-group').offset().top - ($(window).height() / 1.2)) {

      $('.home-items-group figure').each(function(i){

        setTimeout(function(){
          $('.home-items-group figure').eq(i).addClass('is-showing');
        }, 150 * (i+1));
      });

    }

    if(wScroll > $('.large-window').offset().top - $(window).height()){

      $('.large-window').css({'background-position':'center '+ (wScroll - $('.large-window').offset().top) +'px'});

      var opacity = (wScroll - $('.large-window').offset().top + 400) / (wScroll / 5);

      $('.window-tint').css({'opacity': opacity});

    }

    if(wScroll > $('.blog-posts').offset().top - $(window).height()){

      var offset = Math.min(0, wScroll - $('.blog-posts').offset().top +$(window).height() - 350);

      $('.post-1').css({'transform': 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +'px)'});

      $('.post-3').css({'transform': 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +'px)'});

    }
  }

});
