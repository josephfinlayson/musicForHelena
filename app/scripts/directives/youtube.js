'use strict';

var myApp = angular.module('youtube', []);

myApp.constant('YT_event', {
    STOP: 0,
    PLAY: 1,
    PAUSE: 2,
    STATUS_CHANGE: 3
});

myApp.directive('youtube', function($window, YT_event, $http) {
    return {
        restrict: 'E',
        scope: {
            height: '@',
            width: '@',
            searchTerm: '@',
            type: '@',
            potato: '=',
            trackdetails: '=trackdetails',
            youtubecontrols: '=',
            playerready: '='
        },
        // transclude: true,
        templateUrl: 'views/templates/youtube.html',

        link: function(scope, element, attrs, $rootScope, $parent) {
            // console.log("parent", scope.$parent.potato)
            scope.type = attrs.type;
            console.log(scope.type)
            var apiKey = 'AIzaSyAXaCYfu1UnCYX2VMcsu-KOTn4QJJ_SGEM';
            var searchTerm, player;

            scope.youtubecontrols.pause = function() {
                if (typeof player !== 'undefined') {
                    player.pauseVideo();
                }
            }

            scope.youtubecontrols.play = function() {
                if (typeof player !== 'undefined' && !YT.PlayerState.PLAYING) {
                    player.playVideo();
                }
            }

            scope.$watch(function() {
                return scope.trackdetails.artist;
            }, function() {
                if (scope.trackdetails.artist) {
                    getVideoId()
                }
            })

            scope.$watch(function() {
                return scope.playerReady;
            }, function() {
              console.log(element)
                if (scope.playerReady && YT) {
                  console.log(element.find('.youtubePlayer'))
                    player = new YT.Player(element.find('.youtubePlayer')[0], {
                        playerVars: {
                            html5: 1,
                            theme: 'light',
                            modesbranding: 0,
                            color: 'white',
                            autoplay: 0,
                            iv_load_policy: 3,
                            showinfo: 1,
                            controls: 1,
                            key: apiKey
                        },

                        height: scope.height,
                        width: scope.width,

                        events: {
                            'onReady': function() {
                                console.log("ready!");
                                player.loadVideoById(scope.videoid);

                            },
                            'onStateChange': function(event) {

                                var message = {
                                    event: YT_event.STATUS_CHANGE,
                                    data: ''
                                };

                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = 'PLAYING';
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = 'ENDED';
                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = 'NOT PLAYING';
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = 'PAUSED';
                                        break;
                                }
                                scope.$apply(function() {
                                    scope.$emit(message.event, message.data);
                                });
                            }
                        }
                    });
                }

            })

            if (!window.yt) {
                var tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                if (firstScriptTag.src !== 'https://www.youtube.com/iframe_api') {
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
            }

            var getVideoId = function() {
                console.log(scope.trackdetails.searchTerm);
                $http.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: apiKey,
                        type: 'video',
                        maxResults: '1',
                        part: 'id,snippet',
                        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
                        q: scope.trackdetails.searchTerm || 'neil young alabama'
                    }
                }).success(function(data) {
                    scope.videoid = data.items[0].id.videoId;
                    scope.trackdetails.fullTitle = data.items[0].snippet.title;
                })
            }

            $window.onYouTubeIframeAPIReady = function() {
                scope.playerReady = true
            }

            scope.$watch('height + width', function(newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }

                player.setSize(scope.width, scope.height);

            });

            scope.$watch('videoid', function(newValue, oldValue) {
                if (newValue == oldValue) {}
                if (typeof player !== 'undefined') {
                    if (scope.videoid) {
                        player.loadVideoById(scope.videoid);
                    }
                }
            });

            scope.$on(YT_event.STOP, function() {
                player.seekTo(0);
                player.stopVideo();
            });

            scope.$on(YT_event.PLAY, function() {
                player.playVideo();
            });

            scope.$on(YT_event.PAUSE, function() {
                player.pauseVideo();
            });

        }
    };
});
