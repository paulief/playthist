controllers.controller('BrowseCtrl', ['$scope', function($scope) {


	SC.get("/tracks", {limit: 10}, function(tracks){
  		//alert("Latest track: " + tracks[0].title);
  		console.log()
  		$scope.tracks = tracks;
	});
}]);