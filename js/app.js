
var app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http) => {

    $http.get('storage/member.json').then( (res) => {
        $scope.mem = res.data
    });

    $http.get('storage/products.json').then( (res) => {
        $scope.product = res.data
    });

    $scope.carts = [];

    var CartInStorage = sessionStorage.getItem('cart');
    if (CartInStorage) {
        $scope.carts = angular.fromJson(CartInStorage);
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
        } else {
            pro.quantity = 1;
            $scope.carts.push(pro);
        }

        sessionStorage.setItem('cart', angular.toJson($scope.carts));
        $scope.cart = pro;
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