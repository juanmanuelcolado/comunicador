communicatorApp.controller('cardsCtrl', function($scope, cardDbService) {
    $scope.cards = [];
    
    cardDbService.selectAll().then(function(results) {
        $scope.cards = results;
    });
});