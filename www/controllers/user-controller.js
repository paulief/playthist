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
			setLoading(false);
			setError(null);
	};

	$scope.completeLogin = function() {
		setError(null);
		setLoading(true);
		user.login({
			login: $scope.username.text,
			password: $scope.password.text
		}, function(error, result) {
			if (error) {
				console.log(error);
				setError(error);
				setLoading(false);
			} else {
				console.log("User logged in");
				setLoading(false);
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
		setError(null);
		setLoading(true);
		user.signup({
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
				setError(error);
				setLoading(false);
			} else {
				console.log("Created user " + result.login);
				setLoading(false);
				$scope.signupModal.hide();
			};
		});
	};
	
	$scope.cancelSignup = function() {
		$scope.signupModal.hide();
	};

	$scope.logout = function() {
		user.logout(function() {
			console.log("User logged out");
			$scope.username.text = "";
			$scope.password.text = "";
		});
	};

	//refactoring out stopping loading img and error
	var setLoading = function(loading) {
		$timeout(function() {
			$scope.loading = loading;
		});
	};

	var setError = function(error) {
		$timeout(function() {
			$scope.error = error;
		});
	};

}]);