communicatorApp.controller('cardsCtrl', function($scope, cardDbService) {
    $scope.cards = [];
    
    cardDbService.getCards().then(function(results) {
        $scope.cards = results;
    });
});