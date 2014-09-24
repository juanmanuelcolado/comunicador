communicatorApp.controller('levelCardsCtrl', function($scope, $stateParams, cardDbService, registryService) {

    registryService.pickedLevelNumber = parseInt($stateParams.levelNumber, 10);

    cardDbService.find().then(function(results) {
        $scope.cards = results;
    });

});