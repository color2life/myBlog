'use strict';

angular
  .module('appApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/blog', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/blog/matchdep', {
        templateUrl: 'views/blog/matchdep.html',
        controller: 'BlogMatchdepCtrl'
      })
      .when('/blog/startups', {
        templateUrl: 'views/blog/startups.html',
        controller: 'BlogStartupsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
