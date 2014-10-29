'use strict';

/**
 * @ngdoc function
 * @name autoPlaylistApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the autoPlaylistApp
 */
angular.module('autoPlaylistApp')
    .controller('MainCtrl', function($scope, $interval, videoIdService) {

        $scope.artistVideoId = false;
        $scope.trackVideoId = false;
        $scope.trackPlayerId = "trackplayer";
        $scope.artistPlayerId = "artistplayer";

        // $scope.trackdetails = {};
        // $scope.trackdetails.artist = false;

        $scope.trackPlayer = {};
        $scope.artistPlayer = {};


        $scope.setVideoId = function(obj, type) {
            var searchTerm = updateScope(obj);
            videoIdService(searchTerm).then(function(data) {
                $scope[type + "VideoId"] = data.videoId;
            })
        }

        var updateScope = function(obj) {
            $scope.trackdetails = {}
            if (obj.artist) {
                $scope.trackdetails.artist = obj.artist.name;
                $scope.trackdetails.track = obj.name;
            } else {
                $scope.trackdetails.artist = obj.name;
            }
            var sT = $scope.trackdetails.artist
            if ($scope.trackdetails.track) {
                sT = sT + ' ' + $scope.trackdetails.track;
            }
            $scope.trackdetails.searchTerm = sT;
            return sT
        }

        $scope.pauseArtistPlayer = function() {
            console.log("pausing artist player")
            if (typeof $scope.artistPlayer.pauseVideo !== 'undefined') {
                $scope.artistPlayer.pauseVideo()
            }
        }

        $scope.playArtistPlayer = function() {
            console.log("play artist player")
            if (typeof $scope.artistPlayer.playVideo !== 'undefined') {
                $scope.artistPlayer.playVideo()
            }
        }

        $scope.pauseTrackPlayer = function() {
            console.log("pausing track player")
            if (typeof $scope.trackPlayer.pauseVideo !== 'undefined') {
                $scope.trackPlayer.pauseVideo()
            }
        }

        $scope.playTrackPlayer = function() {
            console.log("play track player")
            if (typeof $scope.trackPlayer.playVideo !== 'undefined') {
                $scope.trackPlayer.playVideo()
            }
        }

    });
