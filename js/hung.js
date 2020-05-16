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
        console.log('hello');
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

    // $('.h_content_DAR .h_comment_post .h_fivestar a').click(function(){
    //     console.log('hello');
    //     $(this).addClass('active');
    //     return false;
        
    // });
    $('#stars a').on('mouseover',function(){
        var onStar = parseInt($(this).data('value'),10);//Ngôi sao hiện đang di chuột
        //Làm nổi bật tất cả các ngôi sao trước ngôi sao được di
        $(this).parent().children('a.star').each(function(e){
            if(e < onStar){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        })
        return false;
    })

    //hành động khi kích vào ngôi sao
    $('#stars a').click(function(){
        var onStar = parseInt($(this).data('value'),10);
        var stars = $(this).parent().children('a.star');
        console.log('hello');
        for(i = 0;i <stars.length;i++){
            $(stars[i]).removeClass('active');
        }
        for(i = 0;i <onStar;i++){
            $(stars[i]).addClass('active');

        }
        return false;
    })

    //=======================================Chọn ảnh để xem detail
    $('.part1 .h_khung_anh_nho .h_anhduoinho ').click(function(){
        console.log('hello');
        var danhmucabc = $(this).data('class');
        console.log(danhmucabc);
        $('.part1 .h_khung_anh_nho .h_anhduoinho ').children('.part1 .h_khung_anh_nho .h_anhduoinho .h_lopmo_anhnho ').css('opacity','');
        $(this).children('.part1 .h_khung_anh_nho .h_anhduoinho .h_lopmo_anhnho ').css('opacity','0');

        $('.part1 .h_khungto_left .itemxx').each(function(){
            if($(this).hasClass(danhmucabc)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });

        //xử lí ảnh to zoom
        $('.tile')
    // tile mouse actions
    .on('mouseover', function(){
      $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
    })
    .on('mouseout', function(){
      $(this).children('.photo').css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e){
      $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    })
    // tiles set up
    .each(function(){
      $(this)
        // add a photo container
        .append('<div class="photo"></div>')
        // some text just to show zoom level on current item in this example
        // .append('<div class="txt"><div class="x">'+ $(this).attr('data-scale') +'x</div>ZOOM ON<br>HOVER</div>')
        // set up a background image for each tile based on data-image attribute
        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    })

    // Nút checkbox hiển thị form diff address
    $('#h_form_diff').hide();
    $('#checkbox1').click(function(){
        if($(this).is(':checked')){
            $('#h_form_diff').show();
        }else{
            $('#h_form_diff').hide();
        }
    })

    //viết cho hiệu ứng trang checkout
    $('.h_content_right_under_DBT .h_h4_DBT').addClass('active_checkout');
    $('.h_content_right_under_content #h_h4_COD_content').slideUp();
    $('.h_content_right_under_content #h_h4_PP_content').slideUp();
    $('.h_content_right_under_content #h_h4_DBT_content').slideDown();
    $('.h_content_right_under_content h4').click(function(){
        $('.h_content_right_under_content p').slideUp();
        // console.log('đã click');
        $('.h_content_right_under_content h4').removeClass('active_checkout');
        $(this).addClass('active_checkout');
        $(this).next('.h_content_right_under_content p').slideToggle();
    })
    
});