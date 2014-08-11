communicatorApp.controller('cardsCtrl', function($scope, cardDbService) {
    $scope.cards = [];
    
    cardDbService.getAll().then(function(results) {
        $scope.cards = results;
    });
});