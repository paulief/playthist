controllers.controller('UserCtrl', ['$scope', '$rootScope', '$ionicModal', function($scope, $rootScope, $ionicModal) {

	$scope.username = {};
	$scope.password = {};
	
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
		//console.log($scope.error);
		//console.log($rootScope.error);
		//SHOULD VALIDATE LOGIN (CAN BE DONE IN TEMPLATE)
		UserApp.User.login({
			login: $scope.username.text,
			password: $scope.password.text
		}, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log("User logged in");
			};
		});
	};

	$scope.cancelLogin = function() {
		$scope.modal.hide();
	}
	

}]);