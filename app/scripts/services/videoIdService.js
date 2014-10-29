angular.module('autoPlaylistApp')

.factory('videoIdService', function($http) {

    var videoIdService = function(searchTerm) {
        var apiKey = 'AIzaSyAXaCYfu1UnCYX2VMcsu-KOTn4QJJ_SGEM';

        return $http.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: apiKey,
                type: 'video',
                maxResults: '1',
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
                q: searchTerm || 'neil young alabama'
            }
        }).then(function(data) {
            var videoId = data.data.items[0].id.videoId;
            var fullTitle = data.data.items[0].snippet.title;
        	return {
        		videoId: videoId,
        		fullTitle: fullTitle
        	}
        });
    };
    return videoIdService;
});
