'use strict';

/**
 * @ngdoc overview
 * @name autoPlaylistApp
 * @description
 * # autoPlaylistApp
 *
 * Main module of the application.
 */
angular
  .module('autoPlaylistApp', [
    'ngRoute',
    'ngTouch',
    'angularSlideables',
    'lastfm',

    'youtube',
    'youtube-embed'
  ])
  .config(function ($routeProvider,   $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode = true;
  });
