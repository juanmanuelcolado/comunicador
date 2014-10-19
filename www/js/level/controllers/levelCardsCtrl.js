communicatorApp.controller('levelCardsCtrl', function($scope, $stateParams, tutorialService, cardDbService, registryService) {
    registryService.pickedLevelNumber = parseInt($stateParams.levelNumber, 10);

    cardDbService.selectEnabled().then(function(results) {
        $scope.cards = results;
    });

    tutorialService.showIfActive();
});