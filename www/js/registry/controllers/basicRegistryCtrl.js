communicatorApp.controller('basicRegistryCtrl', function($scope, currentReceiverService, registryService, $q, $ionicPopup) {

	var basicScoreValues = { true: 'withoutHelp', false: 'withHelp' };
	
	$scope.registry = {
		receiver: currentReceiverService.receiver,
		pick: true,
		reach: true,
		drop: true
	};

	$scope.saveRegistry = function() {
		checkForDefaultScores().then(function(){
			$scope.registry.pick = basicScoreValues[$scope.registry.pick];
			$scope.registry.reach = basicScoreValues[$scope.registry.reach];
			$scope.registry.drop = basicScoreValues[$scope.registry.drop];
			registryService.saveRegistry($scope.registry);
			$scope.goBack();
		});
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

	var checkForDefaultScores = function() {
		var deferred = $q.defer();
		if ($scope.registry.pick && $scope.registry.reach && $scope.registry.drop) {
			$ionicPopup.confirm({
				title: "Advertencia",
				template: "Usted va a ingresar un registro con todos los pasos correctos. ¿Está seguro que desea hacer esto?"
			}).then(function(response){
				if (response) {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			})
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	};
});