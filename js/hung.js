$(function(){
    //viết cho nút
    $('.h_titleproduct ul li a').click(function(event) {
        console.log('hello');
        
        //phát hiện data class của nút được kích
        var danhmuc = $(this).data('class');

        // var isotopeButton = $('.h_titleproduct ul li');
        // $(isotopeButton).each(function(){
        //     $(this).on('click', function(){
        //         for(var i=0; i<isotopeButton.length; i++) {
        //             $(isotopeButton[i]).removeClass('selected');
        //         }   
        //     });
        // })
        $('.h_titleproduct ul li a').removeClass("selected");
        $(this).addClass("selected");  
        
        // console.log(danhmuc);
        $('.h_allproduct .itemx').each(function(){
            if($(this).hasClass(danhmuc)){
                $(this).show();
            }else{
                $(this).hide();
            }
        })
        return false;
    });

    //=====================================================tooltip 3 nút
    $('[data-hieuung="tooltip"]').tooltip();

    // ====================================================Code cho nút filter mở ra trang shop
    $('.nut_mo_ra_menu').click(function(){
        // console.log('hello');
        $('#menu').addClass('traisang');
        return false;
    });
    $('.h_rowduoi').click(function(){
        // console.log('hello');
        $('#menu').removeClass('traisang');
        return false;
    });

    // =======================================================slide ranger

    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );


    //======================================================== DAR
    $('.part2 .h_title_DAR ul li a').click(function () {  
        // console.log('hello');
        

        var danhmuc2 = $(this).data('class');
        console.log(danhmuc2);
        $('.part2 .h_title_DAR ul li a').removeClass("selected");
        $(this).addClass('selected');
        $('#productDetail .h_content_DAR .itemkhoi').each(function(){
            if($(this).hasClass(danhmuc2)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
        return false;
    })
    //========================================================= Rating

    $('.h_content_DAR .h_comment_post .h_fivestar a').click(function(){
        console.log('hello');
    });
    
});