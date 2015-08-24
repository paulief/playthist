controllers.controller('UserCtrl', ['$scope', '$rootScope', '$ionicModal', '$timeout', function($scope, $rootScope, $ionicModal, $timeout) {

	$scope.username = {};
	$scope.password = {};

	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.loginModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/signup.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.signupModal = modal;
	});
	
	$scope.initiateLogin = function() {
			$scope.loginModal.show();
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
				//$scope.error = error;
			} else {
				console.log("User logged in");
			};
		});
	};

	$scope.cancelLogin = function() {
		$scope.loginModal.hide();
	};

	$scope.initiateSignup = function() {
		$scope.loginModal.hide();
		$timeout(function() {$scope.signupModal.show()}, 500);
	};
	
	$scope.cancelSignup = function() {
		$scope.signupModal.hide();
	};

}]);