controllers.controller('BrowseCtrl', ['$scope', '$stateParams', 'MusicGetter', '$ionicModal', 
	function($scope, $stateParams, MusicGetter, $ionicModal) {

	//pass in state params, use it to get the possible options for the selected source
	console.log($stateParams.tracklistType);
	console.log($stateParams.playlistId);

	/** SC.get("/users/70188989/favorites", {limit: 10}, function(tracks){
  		//alert("Latest track: " + tracks[0].title);
  		console.log(tracks);
  		$scope.tracks = tracks;
	}); */
	
	if ($stateParams.source){
		//var retProm = MusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null);
		//console.log(retProm);
		MusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null).then(function(tracks) {
			$scope.tracks = tracks;
		});
	};

	$ionicModal.fromTemplateUrl('templates/add_track_to_lists.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openPlaylistChoices = function() {
		$scope.modal.show();
	};

	$scope.addTrackToLists = function() {
		$scope.modal.hide();
	}
}]);