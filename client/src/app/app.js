angular.module('app', [
  'ngRoute', // angular-route.
  'templates.app', // app templates bag.
  'templates.common', // common templates bag.
  'ui.bootstrap.tpls', // angular-bootstrap templates.
  'dashboard' // dashboard module.
]);

angular.module('app').constant('MONGOLAB_CONFIG', {
  BASE_URL: '/databases/',
  DB_NAME: 'mean-db'
});

angular.module('app').config([
           '$routeProvider','$locationProvider',
  function ($routeProvider,  $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider.otherwise({redirectTo:'/info'});
  }
]);

// angular.module('app').run(['security', function(security) {
//   // Get the current user when the application starts
//   // (in case they are still logged in from a previous session)
//   security.requestCurrentUser();
// }]);

/* App Controller */
angular.module('app').controller('AppCtrl', [
  '$scope', function($scope) {
  }
]);
