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
			trackId: track.id,
			trackTitle: track.title,
			artworkUrl: track.artwork_url,
			streamUrl: track.stream_url,
			trackSrc: $stateParams.source,
			trackPostedBy: track.user.username
		};
	};

	var openPlaylistChoices = function() {
		$scope.modal.show();
	};

	$scope.addTrackToLists = function() {
		var trackToSave = {track: $scope.activeTrack, playlists: 1 /*will be array*/};
		//need error handling here
		PlaylistHTTPManager.addTrackToPlaylist(trackToSave).then(function(msg) {
			console.log(msg);
			$scope.modal.hide();
		});		
	};

	//playlist chosen from Browse Playlists
	$scope.choosePlaylistTracks = function(playlist) {
		CurrentBrowsingPlaylist.setCurrentPlaylist(playlist);
	};
}]);