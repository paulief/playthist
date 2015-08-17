controllers.controller('UserPlaylistTracksCtrl', ['$scope', 'PlaylistHTTPManager', '$stateParams',
	function($scope, PlaylistHTTPManager, $stateParams) {

		PlaylistHTTPManager.getUserPlaylistTracks($stateParams.playlistId).then(function(tracks) {
			$scope.tracks = tracks;
		});
}]);