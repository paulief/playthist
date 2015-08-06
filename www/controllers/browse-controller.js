controllers.controller('BrowseCtrl', ['$scope', '$stateParams', 'MusicGetter', 'CurrentPlaylist', 'PlaylistHTTPManager', '$ionicModal', 
	function($scope, $stateParams, MusicGetter, CurrentPlaylist, PlaylistHTTPManager, $ionicModal) {

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
				switch($stateParams.tracklistType) {
					case "favorites":
						MusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null).then(function(tracks) {
							$scope.tracks = tracks;
						});
					break;
					case "playlistTracks":
						$scope.tracks = CurrentPlaylist.getCurrentPlaylist().tracks;
					break;
				}
			break;
		}
	};

	$ionicModal.fromTemplateUrl('templates/add_track_to_lists.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.trackChosenToAdd = function(track) {
		$scope.activeTrack = getNeededTrackFields(track);
		openPlaylistChoices();
	};

	var getNeededTrackFields = function(track) {
		return {
			track_id: track.id,
			track_title: track.title,
			artwork_url: track.artwork_url,
			stream_url: track.stream_url,
			track_src: $stateParams.source
		};
	};

	var openPlaylistChoices = function() {
		$scope.modal.show();
	};

	$scope.addTrackToLists = function() {
		//need error handling here
		PlaylistHTTPManager.addTrackToPlaylist($scope.activeTrack, [], 1).then(function(msg) {
			console.log(msg);
			$scope.modal.hide();
		});		
	}

	//playlist chosen from Browse Playlists
	$scope.choosePlaylistTracks = function(playlist) {
		CurrentPlaylist.setCurrentPlaylist(playlist);
	};
}]);