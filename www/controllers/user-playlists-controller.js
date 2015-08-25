/*
This is a separate controller from the browse controller because there will be extra functionality that you don't need while browsing other sources
like sharing/exporting/deleting
*/

controllers.controller('UserPlaylistsCtrl', ['$scope', '$rootScope', 'PlaylistHTTPManager', 'UserPlaylists', '$ionicModal', 
	function($scope, $rootScope, PlaylistHTTPManager, UserPlaylists, $ionicModal) {
		
		$scope.playlists =  {};

		UserPlaylists.getUserPlaylists($rootScope.user.user_id).then(function(playlists) {
			$scope.playlists = playlists;
			console.log($rootScope.user.user_id);	
		}); //no playlists edge case? 


		$ionicModal.fromTemplateUrl('templates/create_new_playlist.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});

		$scope.createNewPlaylist = function() {
			$scope.modal.show();
		};
		$scope.newPlaylistTitle = {};
		$scope.saveNewPlaylist = function() {
			console.log($rootScope.user.user_id);
			var newPlaylist = {userId: $rootScope.user.user_id, playlistName: $scope.newPlaylistTitle.text};
			//need error handling here
			PlaylistHTTPManager.createPlaylist(newPlaylist).then(function(msg) {
				console.log(msg.message);
				$scope.playlists.push(newPlaylist);
				$scope.newPlaylistTitle.text = '';
				$scope.modal.hide();
			});
			console.log("Creating playlist: " + $scope.newPlaylistTitle.text);
		};


}]);