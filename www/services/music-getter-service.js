services.factory('MusicGetter', ['$q', '$http', function($q, $http) {
	var musicGetterService = {};

	musicGetterService.getTracks = function(source, tracklistType, playlistId) {
		console.log("called getTracks");
		switch(source) {
			case "soundcloud":
				switch(tracklistType) {
					case "favorites":
						var retProm = this.getSoundcloudFavorites(); 
						console.log(retProm);
						return retProm;
						break;


				}
				break;
			default:
		}
	};
	musicGetterService.getSoundcloudFavorites = function() {
		console.log("called getSoundcloudFavorites");
		var deferred = $q.defer();
		$http.get('http://api.soundcloud.com/users/70188989/favorites?client_id=' + SOUNDCLOUD_CLIENT_ID).success(function(data, status, headers, config) {
			deferred.resolve(data);
		}).error(function(data, status, headers, config) {
			console.log("error in GET request");
		});

		return deferred.promise;
	};

	return musicGetterService;
}]);