var myApp = angular.module('myApp');

myApp.controller('CarController', ['$scope', '$http', '$location', '$routeParams','$route',function($scope, $http, $location, $routeParams, $route) {
    console.log('Car Controller loaded');
    $scope.getCars = function () {
        $http.get('/api/cars').then( function (response){
            $scope.cars = response.data;
        })
    };

    $scope.sendEmail = function (name, phone) {
      var obj = {
        name: name,
        phone: phone
      }
      $http.post('/sendEmail',obj).then(function (response) {
        console.log(response, "response");
        if(response.status == 200){
          $route.reload();
        }
      })
    }

    $scope.getCar = function () {
        var id = $routeParams.id;
        $http.get('/api/cars/' + id).then( function (response){
            $scope.car = response.data;
        })
    };


    $scope.addComment = function (comment) {
      var obj = {
        comment: comment
      }
      console.log("comment in view:", comment);
      var id = $routeParams.id;
      $http.put('/api/cars/add_comment/' + id, obj).then(function (response) {
        $route.reload();
      })
    };

    $scope.removeComment = function (comment) {
      var id = $routeParams.id;
      var obj = {
        comment: comment
      };
      $http.put('/api/cars/del_comment/'+id, obj).then(function (response) {
        $route.reload();
      })
    };

    $scope.addCar = function () {
      $http.post('/api/cars/', $scope.car).then( function (response){
          $location.path('/cars');
      })
    };

    $scope.updateCar = function () {
      var id = $routeParams.id;
      $http.put('/api/cars/' + id, $scope.car).then( function (response){
          $location.path('/cars');
      })
    };

    $scope.deleteCar = function (id) {
      $http.delete('/api/cars/' + id,).then( function (response){
          $location.path('/cars');
      })
    };
}]);
