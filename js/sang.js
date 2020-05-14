
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

    // const close_cart;

    $('.close-side-cart').click( () => {
        $('.side-nav-cart').removeClass('size-side');
    });

    $('.nav-icon-cart').click( () => {
        $('.side-nav-cart').addClass('size-side');
    });
    

    $('.close-side-mobile-menu').click( () => {
        $('.side-nav-menu-mobile').removeClass('size-side');
    });

    $('.nav-icon-bars').click( () => {
        $('.side-nav-menu-mobile').addClass('size-side');
    });                             
    
});