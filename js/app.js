
var app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http) => {

    $http.get('storage/member.json').then( (res) => {
        $scope.mem = res.data
    });

    $http.get('storage/products.json').then( (res) => {
        $scope.product = res.data
    });

    $scope.carts = [];
    $scope.carts_qty = 0;
    $scope.carts_total = 0;

    var CartInStorage = sessionStorage.getItem('cart');

    var QuantityCart = sessionStorage.getItem('cart_qty');

    var TotalCart = sessionStorage.getItem('cart_total');

    if (CartInStorage) {
        $scope.carts = angular.fromJson(CartInStorage);
        // $scope.carts_qty = sessionStorage.getItem('carts_qty');
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
});