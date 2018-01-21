function browserSearch(){
    var browser = navigator.userAgent;
    (browser.search(/Chrome/i) != -1
    || browser.search(/OPR/i) != -1
    || browser.search(/Firefox/i) != -1
    || browser.search(/Safari/i) != -1) ? browser = true:
    browser = false;
    if(browser != true){ $('.arrow').hide(); }
}
browserSearch();
$(function() {
    /* main alboms prompts*/
    var numberAlbom;
    function hintShow(albom,block){
        numberAlbom = $(albom).attr('src');
        $(albom).css('opacity', '0.3');
        $(block).css('display', 'block');
    }
    function hintHide(albom, block){
        numberAlbom = 0;
        $(albom).css('opacity', '1');
        $(block).css('display', 'none');
    }
    function Hint (albom, block) { $(albom).mouseover(function(){
         hintShow(albom, block) })
            .mouseout(function(){ hintHide(albom, block) })
    }
    for(var counter = 1; counter <= 6; ++counter){
         Hint('img[alt=exemple_' + counter + ']', '#exemple_' + counter );
    }
    for(var counter = 1; counter <= 18; ++counter){
         Hint('img[alt=portfolio_exemple_' + counter + ']', '#portfolio_exemple_' + counter );
    }

    /*mobile drop-down menu*/
    $('.mob_menu').click(function(){
        ($('.drop_down').css('display')) === 'none' ?
            $('.drop_down').css('display', 'inline') :
                $('.drop_down').css('display', 'none') ;
    ($('.drop_down').css('display')) === 'none' ?
        $('.carousel-indicators').css('display', 'inline') :
            $('.carousel-indicators').css('display', 'none') ;
    })
    /*video-size*/
    function videoSize(numberVideo){
        var factor = 1.777777;
        var width = document.documentElement.clientWidth*0.6;
                        (document.documentElement.clientWidth > 600) ?
                            $('#video_' + numberVideo).attr('width', width).attr('height',width/factor):
                                $('#video_' + numberVideo).attr('width', 299).attr('height', 168);
    }videoSize(1);videoSize(2);videoSize(3);
        $(window).resize(function(){
            videoSize(1);
            videoSize(2);
            videoSize(3);
        });
    /*alboms slider
    $('.albom').click(function(){
        $('.alboms_modal').css('display', 'block');
        $('.alboms_modal_content').css('display', 'block');
    })
    $('.alboms_modal').click(function(){
          if($('.alboms_modal_content').css('display')){
            $('.alboms_modal').css('display', 'none');
            $('.alboms_modal_content').css('display', 'none');
            // location.reload();
        }
    })
    $('.fa-window-close-o').click(function(){
          if($('.alboms_modal_content').css('display')){
            $('.alboms_modal').css('display', 'none');
            $('.alboms_modal_content').css('display', 'none');
            // location.reload();
        }
    })*/
    /*anchor up page*/
    anchor('.fa-angle-double-up');
    function anchor(icon){
        $(icon).hide();
        $(function () {
            $(window).scroll(function () {
                ($(this).scrollTop() > 100) ? $(icon).fadeIn() : $(icon).fadeOut();
            });
            $(icon).click(function () {
                $('body,html').animate({ scrollTop: 0 }, 800);
                return false;
            });
        });
    }
    /*blog content hidden-showing*/
    function blogContent(number){
        $('#post_' + number).click(function(){
            this.status = $('.post_content_' + number).css('display');
            (this.status === 'none') ?
                $('.post_content_' + number).show() :
                    $('.post_content_' + number).hide();
        });
    }
    var BlogPostsAmount = function (objectBlock){
        for(var num = 1; num <= objectBlock; num++){
            blogContent(num);
        }
    }(3);
});
