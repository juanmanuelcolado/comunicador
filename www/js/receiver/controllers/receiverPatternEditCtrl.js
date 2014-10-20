communicatorApp.controller('receiverPatternEditCtrl', function($scope, $state, $ionicNavBarDelegate, $ionicPopup, receiverDbService, currentReceiverService) {
	
	$scope.lock = {};
	$scope.tempPattern = '';
	$scope.patternError = false;

	$scope.$on('modal.shown', function() {
		$scope.lock = new PatternLock("#lock", { 
			margin: 15,
			onDraw: validatePattern
		});
	});

	$scope.closeModal = function() {
		$scope.patternModal.hide();
	};

	$scope.save = function () {
		if (!$scope.patternError) {
			if ($scope.tempPattern) {
				$scope.receiver.pattern = $scope.tempPattern;
			}
			$scope.closeModal();
		}
	};

	function validatePattern (pattern) {
		$scope.tempPattern = pattern;
		if (pattern.length >= 3) {
			hideShortPatternError();
		} else {
			showShortPatternError();
		}
	}

	function hideShortPatternError () {
		$scope.patternError = false;	
		$scope.$apply();	
	}

	function showShortPatternError () {
		$scope.lock.error();
		$scope.patternError = true;	
		$scope.$apply();
	}
});