communicatorApp.controller('advancedRegistryCtrl', function($scope, currentReceiverService, registryService) {

	var advancedRegistryScores = ['withoutHelp', 'withPartialHelp', 'withHelp'];

	$scope.registry = {
		receiver: currentReceiverService.receiver,
		pick: '',
		reach: '',
		drop: ''
	};

	$scope.stepError = {
		pick: false,
		reach: false,
		drop: false
	};

	$scope.changeScore = function(step, score) {
		$scope.registry[step] = score;
	};

	$scope.isScore = function(step, score) {
		return $scope.registry[step] === score;
	};

	$scope.saveRegistry = function() {
		if ($scope.registry.pick && $scope.registry.reach && $scope.registry.drop) {
			registryService.saveRegistry($scope.registry);
			$scope.goBack();
		} else {
			showMissingScoreError();
		}
	};

	$scope.goBack = function() {
		// this is to force a double "back"
	  	var backView = $scope.$viewHistory.views[$scope.$viewHistory.backView.backViewId];
	    $scope.$viewHistory.forcedNav = {
	        viewId:     backView.viewId,
	        navAction: 'moveBack',
	        navDirection: 'back'
	    };
	    backView.go();
	};

	var showMissingScoreError = function() {
		['pick', 'reach', 'drop'].forEach(function(step) {
			$scope.stepError[step] = !$scope.registry[step];
		});
	};
});