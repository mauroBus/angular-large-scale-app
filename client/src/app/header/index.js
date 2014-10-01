angular.module('app')
.controller('HeaderCtrl', [
           '$scope','$location','$route',
  function ($scope,  $location,  $route) {
    $scope.location = $location;

    $scope.home = function () {
        $location.path('/dashboard');
    };

    $scope.isAuthenticated = function() {
      return true;
    };

    $scope.breadcrumbs = [
      {
        name: 'item1',
        path: 'item1/'
      },
      {
        name: 'item2',
        path: 'item2/'
      },
      {
        name: 'item3',
        path: 'item3/'
      },
      {
        name: 'item4',
        path: 'item4/'
      },
      {
        name: 'item5',
        path: 'item5/'
      }
    ];

  }

]);
