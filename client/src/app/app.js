angular.module('app', [
  'ngRoute', // angular-route.
  'templates.app', // app templates bag.
  'templates.common', // common templates bag.
  'ui.bootstrap.tpls', // angular-bootstrap templates.
  'dashboard' // dashboard module.
]);


angular.module('app')

.constant('MONGOLAB_CONFIG', {
  BASE_URL: '/databases/',
  DB_NAME: 'mean-db'
})

.config([
           '$routeProvider','$locationProvider',
  function ($routeProvider,  $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo:'/info'});
  }
])

/* App Controller */
.controller('AppCtrl', [
  '$scope', function($scope) {
    $scope.title = 'My Title';
  }
]);

