controllers.controller('BrowseCtrl', ['$scope', '$stateParams', 'MusicGetter', function($scope, $stateParams, MusicGetter) {

	//pass in state params, use it to get the possible options for the selected source

	/** SC.get("/users/70188989/favorites", {limit: 10}, function(tracks){
  		//alert("Latest track: " + tracks[0].title);
  		console.log(tracks);
  		$scope.tracks = tracks;
	}); */
	
	if ($stateParams.source) {

		console.log($stateParams.source);
		console.log($stateParams.listType);

		switch ($stateParams.listType) {
			case "playlists":
				MusicGetter.getPlaylists($stateParams.source).then(function(playlists) {
					$scope.playlists = playlists;
				});
			break;
			case "tracks":
				MusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null).then(function(tracks) {
					$scope.tracks = tracks;
				});
			break;
		}
		//var retProm = MusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null);
		//console.log(retProm);
	};
}]);