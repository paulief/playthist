/*
Service to handle all HTTP requests involving retrieving or editing playlists (adding/remmoving tracks, etc.)
TODO:
need to pull hostname of node server from config file
retrieving tracks for user playlist
creating new playlist
*/
services.factory('PlaylistHTTPManager', ['$q', '$http', function($q, $http) {
	var playlistHTTPManagerService = {};

	playlistHTTPManagerService.testRequest = function() {
		var deferred = $q.defer();
		$http.get('http://54.69.152.172:3000/').success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			console.log("error in GET request");
		});

		return deferred.promise;
	};

	playlistHTTPManagerService.addTrackToPlaylist = function(track, playlists, userId) {
		var deferred = $q.defer();
		$http.post('http://54.69.152.172:3000/addTrack', {track: track, playlists: playlists}).success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			console.log("error in POST request");
		});

		return deferred.promise;
	};

	playlistHTTPManagerService.createPlaylist = function(userId, playlistName) {
		var deferred = $q.defer();
		$http.post('http://54.69.152.172:3000/createPlaylist', {userId: userId, playlistName: playlistName}).success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			console.log("error in POST request");
		});

		return deferred.promise;
	};

	return playlistHTTPManagerService;
}]);