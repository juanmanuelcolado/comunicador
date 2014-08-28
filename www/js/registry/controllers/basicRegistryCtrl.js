communicatorApp.controller('basicRegistryCtrl', function($scope, currentReceiverService, registryService) {

	var basicScoreValues = { true: 'withoutHelp', false: 'withHelp' };
	var basicScores = { 'withoutHelp': true, 'withPartialHelp': false, 'withHelp': false};
	
	$scope.registry = {
		receiver: currentReceiverService.receiver,
		pick: false,
		reach: false,
		drop: false
	};

	registryService.getLastRegistry().then(function(results) {
		convertToBasicScores(results);
		angular.extend($scope.registry, results);
	});

	$scope.saveRegistry = function() {
		$scope.registry.pick = basicScoreValues[$scope.registry.pick];
		$scope.registry.reach = basicScoreValues[$scope.registry.reach];
		$scope.registry.drop = basicScoreValues[$scope.registry.drop];
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

	function convertToBasicScores (scores) {
		scores.pick = basicScores[scores.pick];
		scores.reach = basicScores[scores.reach];
		scores.drop = basicScores[scores.drop];
	}
});