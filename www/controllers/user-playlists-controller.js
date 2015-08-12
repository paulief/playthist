/*
This is a separate controller from the browse controller because there will be extra functionality that you don't need while browsing other sources
like sharing/exporting/deleting
*/

controllers.controller('UserPlaylistsCtrl', ['$scope', 'PlaylistHTTPManager', '$ionicModal', 
	function($scope, PlaylistHTTPManager, $ionicModal) {
		
		$ionicModal.fromTemplateUrl('templates/create_new_playlist.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.createNewPlaylist = function() {
			$scope.modal.show();
		};
		/*$scope.newPlaylistTitle = {
			text: 'My Playlist'
		};*/
		$scope.newPlaylistTitle = {};
		$scope.saveNewPlaylist = function() {
			var newPlaylist = {userId: 1, playlistName: $scope.newPlaylistTitle.text};
			PlaylistHTTPManager.createPlaylist(newPlaylist).then(function(msg) {
				console.log(msg.message);
				//$scope.playlists.push();
				$scope.modal.hide();
			});
			console.log("Creating playlist: " + $scope.newPlaylistTitle.text);
		};


}]);