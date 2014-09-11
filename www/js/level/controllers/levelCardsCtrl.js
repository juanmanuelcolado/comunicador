communicatorApp.controller('levelCardsCtrl', function($scope, $stateParams, cardDbService, registryService) {

    registryService.pickedLevelNumber = parseInt($stateParams.levelNumber, 10);

    cardDbService.selectEnabled().then(function(results) {
        $scope.cards = results;
    });

});