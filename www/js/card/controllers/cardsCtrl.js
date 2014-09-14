communicatorApp.controller('cardsCtrl', function($scope, cardDbService, listItemDeleteService) {
    $scope.cards = [];
    $scope.eraser = listItemDeleteService;
    $scope.redirectState = "app.singleCard";
    
    cardDbService.selectAll().then(function(results) {
        $scope.cards = results;
    });

    $scope.$on("delete", function(scope, card) {
        cardDbService.delete(card);
        $scope.cards.splice($scope.cards.indexOf(card), 1);
    });
});