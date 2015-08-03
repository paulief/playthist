services.factory('CurrentPlaylist', ['$q', '$http', function($q, $http) {
	var currentPlaylistService = {};
	var currentPlaylist = {};

	currentPlaylistService.setCurrentPlaylist = function(playlist) {
		currentPlaylist = playlist;
	};

	currentPlaylistService.getCurrentPlaylist = function() {
		return currentPlaylist;
	};

	return currentPlaylistService;
}]);