/*
Controller shared by Browse Playlists and Browse Tracks views
*/
controllers.controller('BrowseCtrl', ['$scope', '$stateParams', 'ExternalMusicGetter', 'CurrentBrowsingPlaylist', 'PlaylistHTTPManager', '$ionicModal', 
	function($scope, $stateParams, ExternalMusicGetter, CurrentBrowsingPlaylist, PlaylistHTTPManager, $ionicModal) {

	//stateParams come in from href in template
	if ($stateParams.source) {
		console.log($stateParams.source);
		console.log($stateParams.listType);

		switch ($stateParams.listType) {
			case "playlists":
				ExternalMusicGetter.getPlaylists($stateParams.source).then(function(playlists) {
					$scope.playlists = playlists;
				});
			break;
			case "tracks":
				switch($stateParams.tracklistType) {
					case "favorites":
						ExternalMusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null).then(function(tracks) {
							$scope.tracks = tracks;
						});
					break;
					case "playlistTracks":
						$scope.tracks = CurrentBrowsingPlaylist.getCurrentPlaylist().tracks;
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


	//Functions for the track list page *****************************************

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
			track_src: $stateParams.source,
			track_posted_by: track.user.username
		};
	};

	var openPlaylistChoices = function() {
		$scope.modal.show();
	};

	$scope.addTrackToLists = function() {
		//need error handling here
		PlaylistHTTPManager.addTrackToPlaylist($scope.activeTrack, 1 /*will be array*/).then(function(msg) {
			console.log(msg);
			$scope.modal.hide();
		});		
	};

	//playlist chosen from Browse Playlists
	$scope.choosePlaylistTracks = function(playlist) {
		CurrentBrowsingPlaylist.setCurrentPlaylist(playlist);
	};
}]);