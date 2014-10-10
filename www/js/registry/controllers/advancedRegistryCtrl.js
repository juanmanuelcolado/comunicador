communicatorApp.controller('advancedRegistryCtrl', function($scope, currentReceiverService, registryService) {

	var advancedRegistryScores = ['withoutHelp', 'withPartialHelp', 'withHelp'];

	$scope.registry = {
		receiver: currentReceiverService.receiver,
		pick: 'withHelp',
		reach: '',
		drop: ''
	};

	$scope.changeScore = function(step, score) {
		$scope.registry[step] = score;
	};

	$scope.isScore = function(step, score) {
		return $scope.registry[step] === score;
	};

	$scope.saveRegistry = function() {
		registryService.saveRegistry($scope.registry);
		$scope.goBack();
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
});