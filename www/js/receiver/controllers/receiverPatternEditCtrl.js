communicatorApp.controller('receiverPatternEditCtrl', function($scope, $state, $ionicNavBarDelegate, $ionicPopup, receiverDbService, currentReceiverService) {
	
	$scope.lock = {};

	$scope.patternError = false;

	$scope.$on('modal.shown', function() {
		$scope.lock = new PatternLock("#lock", { 
			margin: getMarginSize(),
			onDraw: validatePattern
		});
	});

	$scope.closeModal = function() {
		$scope.patternModal.hide();
	};

	function validatePattern (pattern) {
		if (pattern.length > 3) {
			$scope.receiver.pattern = pattern;
			$scope.closeModal();
		} else {
			showShortPatternError();
		}
	}

	function showShortPatternError () {
		$scope.lock.error();
		$scope.patternError = true;	
		$scope.$apply();
	}

	function getMarginSize () {
		var containerSize = window.innerWidth - 80;
		var columnSize = containerSize/3;
		var extraSpace = columnSize - 50;
		var marginSize = extraSpace / 2;
		return marginSize;
	}
});