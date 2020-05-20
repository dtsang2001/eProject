
var app = angular.module('myApp', ['ngRoute']);

app.config( ($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        activetab: 'home'
    })
    .when('/shop', {
        templateUrl: 'pages/shop.html',
        activetab: 'shop'
    })
    .when('/blog', {
        templateUrl: 'pages/blog.html'
    })
    .when('/contact', {
        templateUrl: 'pages/contact.html'
    })
    .when('/about', {
        templateUrl: 'pages/about.html'
    })
    .when('/cart', {
        templateUrl: 'pages/cart.html'
    })
    .when('/checkout', {
        templateUrl: 'pages/checkout.html'
    })
    .when('/login', {
        templateUrl: 'pages/login.html'
    })
    .when('/product', {
        templateUrl: 'pages/product-detail.html'
    })
    .when('/blog-detail', {
        templateUrl: 'pages/blog-detail.html'
    })
})

app.controller('myCtrl', ($scope, $http, $location) => {

    $http.get('storage/member.json').then( (res) => {
        $scope.mem = res.data
    });

    $http.get('storage/products.json').then( (res) => {
        $scope.product = res.data
    });

    $http.get('storage/products_child.json').then( (res) => {
        $scope.product_child = res.data
    });

    $scope.text = 'me@gmail.com';
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.info_product;

    var ViewProductDetail = sessionStorage.getItem('info_pro');

    if (ViewProductDetail) {
        $scope.info_product = angular.fromJson(ViewProductDetail);
    }

    $scope.view_product = (pro) => {

        $scope.info_product = pro;

        sessionStorage.setItem('info_pro', angular.toJson($scope.info_product));
    }

    $scope.compare = [];

    var CompareInStorage = sessionStorage.getItem('cpr');

    if (CompareInStorage) {
        $scope.compare = angular.fromJson(CompareInStorage);
    }

    function checkCompareExists(Id) {
        for (var k in $scope.compare) {
            if ($scope.compare[k].Id == Id) {
                return k;
            }
        }
        return -1;   
    }

    $scope.add_compare = (pro) => {
        var itemExists = checkCompareExists(pro.Id);

        if (itemExists == -1) {
            $scope.compare.push(pro);
        }

        sessionStorage.setItem('cpr', angular.toJson($scope.compare));
    }

    $scope.remove_compare = (Id) => {
        var itemExists = checkCompareExists(Id);

        if (itemExists != -1) {
            $scope.compare.splice(itemExists, 1);
            sessionStorage.setItem('cpr', angular.toJson($scope.compare));
        }
    }

    $scope.carts = [];
    $scope.carts_qty = 0;
    $scope.carts_total = 0;

    var CartInStorage = sessionStorage.getItem('cart');

    var QuantityCart = sessionStorage.getItem('cart_qty');

    var TotalCart = sessionStorage.getItem('cart_total');

    if (CartInStorage) {
        $scope.carts = angular.fromJson(CartInStorage);
    }

    if (QuantityCart) {
        $scope.carts_qty =  Number(QuantityCart);
    }

    if (TotalCart) {
        $scope.carts_total = Number(TotalCart);
    }

    function checkCartExists(Id) {
        for (var k in $scope.carts) {
            if ($scope.carts[k].Id == Id) {
                return k;
            }
        }
        return -1;
    }

    $scope.update_cart = (obj, pro) => {

        var itemExists = checkCartExists(pro.Id);

        if (itemExists != -1) {
            $scope.carts[itemExists].quantity = obj;
            $scope.carts[itemExists].subtotal_price = (pro.Price * obj);
            $scope.carts_qty = obj;
            $scope.carts_total = (pro.Price * obj);
        }

        sessionStorage.setItem('cart', angular.toJson($scope.carts));
        sessionStorage.setItem('cart_qty', $scope.carts_qty);
        sessionStorage.setItem('cart_total', $scope.carts_total);

        toastr.success("<b> Update quantity success !!! </b>");

    }

    $scope.add_cart_qty = (res, pro) => {
        var qty = (res.quantity == null)? 1 : res.quantity;
        
        var itemExists = checkCartExists(pro.Id);

        if (itemExists != -1) {
            $scope.carts[itemExists].quantity += qty;
            $scope.carts[itemExists].subtotal_price += (pro.Price * qty);
            $scope.carts_qty += qty;
            $scope.carts_total += (pro.Price * qty);
        } else {
            pro.quantity = qty;
            pro.subtotal_price = (pro.Price * qty);
            $scope.carts.push(pro);
            $scope.carts_qty += qty;
            $scope.carts_total += (pro.Price * qty);
        }

        sessionStorage.setItem('cart', angular.toJson($scope.carts));
        sessionStorage.setItem('cart_qty', $scope.carts_qty);
        sessionStorage.setItem('cart_total', $scope.carts_total);
        $scope.cart = pro;
        $('.side-nav-cart').addClass('size-side');
        toastr.success("<b> Add product to cart success !!! </b>");
    }

    $scope.add_cart = (pro) => {

        var itemExists = checkCartExists(pro.Id);

        if (itemExists != -1) {
            $scope.carts[itemExists].quantity += 1;
            $scope.carts[itemExists].subtotal_price += pro.Price;
            $scope.carts_qty += 1;
            $scope.carts_total += pro.Price;
        } else {
            pro.quantity = 1;
            pro.subtotal_price = pro.Price;
            $scope.carts.push(pro);
            $scope.carts_qty += 1;
            $scope.carts_total += pro.Price;
        }

        sessionStorage.setItem('cart', angular.toJson($scope.carts));
        sessionStorage.setItem('cart_qty', $scope.carts_qty);
        sessionStorage.setItem('cart_total', $scope.carts_total);
        $scope.cart = pro;
        $('.side-nav-cart').addClass('size-side');
        toastr.success("<b> Add product to cart success !!! </b>");
    }

    $scope.remove_cart = (Id) => {
        var itemExists = checkCartExists(Id);

        if (itemExists != -1) {
            $scope.carts_total -= ($scope.carts[itemExists].quantity * $scope.carts[itemExists].Price);
            $scope.carts_qty -= $scope.carts[itemExists].quantity;
            $scope.carts.splice(itemExists, 1);
            sessionStorage.setItem('cart_qty', $scope.carts_qty);
            sessionStorage.setItem('cart_total', $scope.carts_total);
            sessionStorage.setItem('cart', angular.toJson($scope.carts));

            toastr.success("<b>Remove product success!!!</b>");
        }
    }

    $scope.delete_cart = () => {
        $scope.carts = [];
        $scope.carts_qty = 0;
        $scope.carts_total = 0;
        sessionStorage.setItem('cart_qty', $scope.carts_qty);
        sessionStorage.setItem('cart_total', $scope.carts_total);
        sessionStorage.setItem('cart', angular.toJson($scope.carts));

        toastr.success("<b>Delete cart success!!!</b>");
    }

    $scope.read_more = (rm) => {
        $('#productDetail .h_description').addClass('more');
        $(rm.target).hide();
    }

    $scope.nav_cart = () => {
        $('.side-nav-cart').addClass('size-side');
    }

    $scope.menu_mobile = () => {
        $('.side-nav-menu-mobile').addClass('size-side');
    }

    $scope.close_cart = () => {
        $('.side-nav-cart').removeClass('size-side');
    }

    $scope.close_menu_mobile = () => {
        $('.side-nav-menu-mobile').removeClass('size-side');
    }

    $scope.sort_cart = (obj) => {
        var cat = obj.target.getAttribute("data-class")
        
        $('.h_titleproduct ul li a').removeClass("selected");
        // $('.h_titleproduct ul li a').addClass("selected");
        $(this).addClass("selected");
        
        
        $('.h_allproduct .itemx').each(function(){
            if($(this).hasClass(cat)){
                $(this).show();
            }else{
                $(this).hide();
            }    
        })
        return false;
    }

    $scope.isActive = function(route) {
        return route === $location.path();
    }

    $scope.filter_shop = () => {
        $('#menu').addClass('traisang');
    }

    $scope.close_filter_shop = () => {
        $('#menu').removeClass('traisang');
    }

    $scope.DAR = (obj1) => {
        var tab = obj1.target.getAttribute("data-class");
        console.log(tab);
        $('.part2 .h_title_DAR ul li a').removeClass("selected");
        // $(this).addClass('selected');
        $(obj1.target).addClass('selected');
        
        $('#productDetail .h_content_DAR .itemkhoi').each(function(){
            if($(this).hasClass(tab)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
        return false;
    }
    $scope.imageSmall = (dd) => {
        
        // alert(dd);
        var tab2 = dd;

        var link = '.' + tab2 + ' .h_lopmo_anhnho';
        $('.h_lopmo_anhnho').removeClass('h_act');
        $(link).addClass('h_act');

        // $(tab2.target).addClass('h_act');
        // console.log(tab2);
        // $('.part1 .h_khung_anh_nho .h_anhduoinho ').children('.part1 .h_khung_anh_nho .h_anhduoinho .h_lopmo_anhnho ').css('opacity','');
        // $(this).children('.part1 .h_khung_anh_nho .h_anhduoinho .h_lopmo_anhnho ').css('opacity','0');

        $('.part1 .h_khungto_left .itemxx').each(function(){
            if($(this).hasClass(tab2)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    }

    $scope.login = (dataset) => {
        var email = dataset.login_email;
        var password = dataset.login_pass;
        var checkMail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        var mail_success = false;

        if (email==null) {
            toastr.error("<b>You have not entered your email !!!</b>");
            $('#form_login .email').removeClass('success_enter');
            $('#form_login .email').addClass('error_enter');
        }else{
            if (!checkMail.test(email)) {
                toastr.error("<b>Your email is in the wrong format !!!</b>");
                $('#form_login .email').removeClass('success_enter');
                $('#form_login .email').addClass('error_enter');
            }else{
                mail_success = true;
                $('#form_login .email').removeClass('error_enter');
                $('#form_login .email').addClass('success_enter');
            }
        }

        var pass_success = false;

        if (password==null) {
            toastr.error("<b>You have not entered your password !!!</b>");
            $('#form_login .pass').removeClass('success_enter');
            $('#form_login .pass').addClass('error_enter');
        }else{
            if (password.length < 5) {
                toastr.error("<b>Password must be greater than 5 !!!</b>");
                $('#form_login .pass').removeClass('success_enter');
                $('#form_login .pass').addClass('error_enter');
            } else {
                pass_success = true;
                $('#form_login .pass').removeClass('error_enter');
                $('#form_login .pass').addClass('success_enter');
            }
        }

        if (pass_success && mail_success) {
            if (email =='admin@gmail.com' && password =='admin') {
                $('#modal-user').modal('hide');
                $location.path('/');
                toastr.success("<b>Register succuss !!!</b>");
                $('#form_login .pass').removeClass('error_enter');
                $('#form_login .pass').addClass('success_enter');
                $('#form_login .email').removeClass('error_enter');
                $('#form_login .email').addClass('success_enter');
            } else {
                toastr.error("<b>Wrong account or password !!!</b>");
                $('#form_login .pass').removeClass('success_enter');
                $('#form_login .pass').addClass('error_enter');
                $('#form_login .email').removeClass('success_enter');
                $('#form_login .email').addClass('error_enter');
            }
            
        }
     
    }

    $scope.Register = (datasetReg) => {
        var email = datasetReg.Register_email;
        var name = datasetReg.Register_name;
        var password = datasetReg.Register_pass;
        var repassword = datasetReg.ReRegister_pass;
        var check = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        var mail_success = false;

        if (email==null) {
            toastr.error("<b>You have not entered your email !!!</b>");
            $('#form_register .email').removeClass('success_enter');
            $('#form_register .email').addClass('error_enter');
        }else{
            if (!check.test(email)) {
                toastr.error("<b>Your email is in the wrong format !!!</b>");
                $('#form_register .email').removeClass('success_enter');
                $('#form_register .email').addClass('error_enter');
            }else{
                var mail_success = true;
                $('#form_register .email').removeClass('error_enter');
                $('#form_register .email').addClass('success_enter');
            }
        }

        var name_success = false;

        if (name==null) {
            toastr.error("<b>You have not entered your name !!!</b>");
            $('#form_register .name').removeClass('success_enter');
            $('#form_register .name').addClass('error_enter');
        }else{
            name_success = true;
            $('#form_register .name').removeClass('error_enter');
            $('#form_register .name').addClass('success_enter');
        }

        var pass_success = false;

        if (password==null) {
            toastr.error("<b>You have not entered your password !!!</b>");
            $('#form_register .pass').removeClass('success_enter');
            $('#form_register .pass').addClass('error_enter');
        }else{
            if (password.length < 5) {
                toastr.error("<b>Password must be greater than 5 !!!</b>");
                $('#form_register .pass').removeClass('success_enter');
                $('#form_register .pass').addClass('error_enter');
            } else {
                pass_success = true;
                $('#form_register .pass').removeClass('error_enter');
                $('#form_register .pass').addClass('success_enter');
            }
        }

        var re_pass_success = false;

        if (repassword==null) {
            toastr.error("<b>You did not enter re Re-password !!!</b>");
            $('#form_register .re_pass').removeClass('success_enter');
            $('#form_register .re_pass').addClass('error_enter');
        }else{
            if (repassword!=password) {
                toastr.error("<b>The entered re-password does not match the password !!!</b>");
                $('#form_register .re_pass').removeClass('success_enter');
                $('#form_register .re_pass').addClass('error_enter');
            }else{
                re_pass_success = true;
                $('#form_register .re_pass').removeClass('error_enter');
                $('#form_register .re_pass').addClass('success_enter');
            }
        }

        if (re_pass_success && pass_success && name_success && mail_success) {
            toastr.success("<b>Register succuss !!!</b>");
        }
    }

    $scope.logout = () => {
        sessionStorage.removeItem('login_inffo');
        $scope.message = "Thoát thành công";
        $scope.loginInfo = null;
    }

    $scope.rating_star = (stars) => {
        var onStar = parseInt($('#stars a').data('value'),10);

        for(i = 0;i <stars;i++){
            $('#stars a').removeClass('active');
        }

        for(i = 0;i <onStar;i++){
            $('#stars a').addClass('active');

        }        
    }

    $scope.create_acc_page = () => {
        $('#modal-user').modal('hide');
        $location.path('/login');
    }

    $scope.continue_shop = () => {
        $location.path('/shop');
    }

    // angular trang checkout
    $scope.openDiff = () => {
        console.log('helllo');
        if($('#checkbox1').is(':checked')){
            $('#checkout .h_content_checkout .h_form_diff_address').removeClass("h_test");
        }else{
            $('#checkout .h_content_checkout .h_form_diff_address').addClass("h_test");
        }
    }

    $scope.clickDBT = (xxx) => {
        var choice = xxx.target.getAttribute("data-class");
        console.log(choice);
        $('#checkout .h_content_right_all .h_content_right_under_content .chung').each(function(){
            if($(this).hasClass(choice)){
                $(this).show();
            }else{
                $(this).hide();
            }    
        });
    }
});
