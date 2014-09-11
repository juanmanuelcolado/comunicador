communicatorApp.controller('levelCardsCtrl', function($scope, $stateParams, cardDbService, registryService) {

    registryService.pickedLevelNumber = $stateParams.levelNumber;

    cardDbService.selectEnabled().then(function(results) {
        $scope.cards = results;
    });

});