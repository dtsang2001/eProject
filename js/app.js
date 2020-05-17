
var app = angular.module('myApp', []);

app.controller('myCtrl', ($scope, $http) => {

    $http.get('storage/member.json').then( (res) => {
        $scope.mem = res.data
    });

    $scope.cart = () => {
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