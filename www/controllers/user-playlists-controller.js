/*
This is a separate controller from the browse controller because there will be extra functionality that you don't need while browsing other sources
like sharing/exporting/deleting
*/

controllers.controller('UserPlaylistsCtrl', ['$scope', 'PlaylistHTTPManager', '$ionicModal', 
	function($scope, PlaylistHTTPManager, $ionicModal) {
		console.log("Playlist Controller found");
}]);