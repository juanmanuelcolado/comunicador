communicatorApp.controller('cardsCtrl', function($scope, cardDbService, listItemDeleteService) {
    $scope.cards = [];
    $scope.loaded = false;
    $scope.eraser = listItemDeleteService;
    $scope.redirectState = "app.singleCard";
    $scope.eraser.showDelete = false;
    
    cardDbService.selectAll().then(function(results) {
        $scope.cards = results;
        $scope.$parent.items = $scope.cards;
        $scope.loaded = true;
    });

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.$on("delete", function(scope, card) {
        cardDbService.delete(card);
        $scope.cards.splice($scope.cards.indexOf(card), 1);
    });
});