var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(($routeProvider) => {
    $routeProvider.when('/', {
        controller: 'CarController',
        templateUrl: 'views/cars.html'
    })
        .when('/cars', {
            controller: 'CarController',
            templateUrl: 'views/cars.html'
        })
        .when('/cars/details/:id', {
            controller: 'CarController',
            templateUrl: 'views/cars_details.html'
        })
        .when('/cars/add', {
            controller: 'CarController',
            templateUrl: 'views/add_car.html'
        })
        .when('/cars/edit/:id', {
            controller: 'CarController',
            templateUrl: 'views/edit_car.html'
        })
        .otherwise({
            redirectTo : '/'
        })
});
