$(function(){
    //viết cho nút
    $('.h_titleproduct ul li a').click(function(event) {
        // console.log('hello');
        
        //phát hiện data class của nút được kích
        var danhmuc = $(this).data('class');

        var isotopeButton = $('.h_titleproduct ul li');
        $(isotopeButton).each(function(){
            $(this).on('click', function(){
                for(var i=0; i<isotopeButton.length; i++) {
                    $(isotopeButton[i]).removeClass('selected');
                }
    
                
            });
        })
        // $(this).addClass("selected");   
        
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
    
});