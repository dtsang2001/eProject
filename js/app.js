
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
    .when('/pro', {
        templateUrl: 'pages/product-detail.html'
    })
})

app.controller('myCtrl', ($scope, $http, $location) => {

    $http.get('storage/member.json').then( (res) => {
        $scope.mem = res.data
    });

    $http.get('storage/products.json').then( (res) => {
        $scope.product = res.data
    });

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
    
});