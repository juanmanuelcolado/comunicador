communicatorApp.controller('levelCardsCtrl', function($scope, $stateParams, tutorialService, cardDbService, registryService) {
    registryService.pickedLevelNumber = parseInt($stateParams.levelNumber, 10);

    cardDbService.selectAll().then(function(results) {
    	var enabledCards = [];
    	for (var i = 0; i < results.length; i++) {
    		if (results[i].enabled === 'true'){
    			enabledCards.push(results[i]);
    		}
    	}
        $scope.cards = enabledCards;
    });

    tutorialService.showIfActive();
});