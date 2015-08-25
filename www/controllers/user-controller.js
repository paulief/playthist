controllers.controller('UserCtrl', ['$scope', '$rootScope', '$ionicModal', '$timeout', 'user', function($scope, $rootScope, $ionicModal, $timeout, user) {

	$scope.username = {};
	$scope.password = {};
	$scope.firstName = {};
	$scope.lastName = {};
	$scope.email = {};

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
		user.login({
			login: $scope.username.text,
			password: $scope.password.text
		}, function(error, result) {
			if (error) {
				console.log(error);
				//$scope.error = error;
			} else {
				//ADD TOKEN TO COOKIES
				console.log("User logged in");
				console.log($rootScope.user);
				$scope.loginModal.hide();
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

	$scope.completeSignup = function() {
		UserApp.User.save({
			first_name: $scope.firstName.text,
			last_name: $scope.lastName.text,
			email: $scope.email.text,
			email_verified: false,
			login: $scope.username.text,
			properties: {},
			features: {},
			permissions: {},
			//subscription: {},
			password: $scope.password.text
		}, function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log("Created user " + result.login);
			};
		});
	};
	
	$scope.cancelSignup = function() {
		$scope.signupModal.hide();
	};

	$scope.logout = function() {
		user.logout(function() {
			console.log("User logged out");
		});
	};

}]);