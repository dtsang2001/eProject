
var position = $(window).scrollTop(); 

$( () => {
    $(window).scroll( (e) => {

        var scroll = $(window).scrollTop();

        if(scroll > position && scroll >= 300) {
            $('#nav-fixed').removeClass('scroll-down-js');
            $('#nav-fixed').addClass('scroll-up-js');
        } else {
            $('#nav-fixed').removeClass('scroll-up-js');
            $('#nav-fixed').addClass('scroll-down-js');
        }

        position = scroll;

    });                        
    
});