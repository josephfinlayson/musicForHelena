'use strict';

/**
 * @ngdoc function
 * @name autoPlaylistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the autoPlaylistApp
 */
angular.module('autoPlaylistApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
