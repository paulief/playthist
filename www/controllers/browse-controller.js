/*
Controller shared by Browse Playlists and Browse Tracks views
*/
controllers.controller('BrowseCtrl', ['$scope', '$rootScope', '$stateParams', 'ExternalMusicGetter', 'CurrentBrowsingPlaylist', 'PlaylistHTTPManager', 'UserPlaylists', '$ionicModal', 
	function($scope, $rootScope, $stateParams, ExternalMusicGetter, CurrentBrowsingPlaylist, PlaylistHTTPManager, UserPlaylists, $ionicModal) {

	/*
	stateParams come in from href in template
	Currently, the same browse template is used for browsing playlists and tracks
	If different functinality is needed, will need to refactor this
	*/
	if ($stateParams.source) {
		console.log($stateParams.source);
		console.log($stateParams.listType);

		switch ($stateParams.listType) {
			case "playlists": //user is looking at their external playlists
				ExternalMusicGetter.getPlaylists($stateParams.source).then(function(playlists) {
					$scope.playlists = playlists;
				});
			break;
			case "tracks": //user is looking at tracks, either from a playlist or their favorites/likes
				switch($stateParams.tracklistType) {
					case "favorites":
						ExternalMusicGetter.getTracks($stateParams.source,$stateParams.tracklistType, null).then(function(tracks) {
							$scope.tracks = tracks;
						});
					break;
					case "playlistTracks": //playlist already comes with tracks from API
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

	//playlist chosen from Browse Playlists
	$scope.choosePlaylistTracks = function(playlist) {
		CurrentBrowsingPlaylist.setCurrentPlaylist(playlist);
	};

	//Functions for the track list page *****************************************

	$scope.trackChosenToAdd = function(track) {
		$scope.activeTrack = PlaythistTrack(track);
		openPlaylistChoices();
	};

	var PlaythistTrack = function(track) {
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

		UserPlaylists.getUserPlaylists($rootScope.user.user_id).then(function(playlists) {
			$scope.userPlaylists = playlists;
		});
		$scope.modal.show();
	};

	$scope.cancelAddingTrack = function() {
		$scope.modal.hide();
	};

	$scope.selectedPlaylists = {};
	$scope.addTrackToLists = function() {
		var chosenPlaylistsIds = Object.keys($scope.selectedPlaylists); //only need IDs, not boolean values
		var trackToSave = {track: $scope.activeTrack, playlists: chosenPlaylistsIds /*will be array*/};
		//need error handling here
		PlaylistHTTPManager.addTrackToPlaylist(trackToSave).then(function(msg) {
			console.log(msg);
			$scope.modal.hide();
		});		
	};

}]);