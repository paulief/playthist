/*
This service is used because the user's playlists are required multiple places in the app
and we want to avoid going to the server every time they are needed
*/
services.factory('UserPlaylists', ['PlaylistHTTPManager', '$q', function(PlaylistHTTPManager, $q) {
	var userPlaylistsService = {};
	var alreadyRetrievedPlaylists = false;
	var userPlaylists = {};

	userPlaylistsService.getUserPlaylists = function(userId) {
		if (!alreadyRetrievedPlaylists) { 
			//calling HTTP service
			return PlaylistHTTPManager.getUserPlaylists(userId).then(function(playlists) {
				userPlaylists = playlists;
				alreadyRetrievedPlaylists = true;
				return userPlaylists;
			});
		} else {
			//playlists already retrieved
			var tempPromise = $q.defer();
			tempPromise.resolve(userPlaylists);
			return tempPromise.promise;
		};
	};

	return userPlaylistsService;
}]);