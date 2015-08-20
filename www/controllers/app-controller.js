controllers.controller('UserCtrl', ['$scope', '$ionicModal', function($scope, $ionicModal) {

	
	$scope.initiateLogin = function() {
		$ionicModal.fromTemplateUrl('templates/login.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	};

	$scope.completeLogin = function() {
		$scope.modal.hide();
	};
	

}]);