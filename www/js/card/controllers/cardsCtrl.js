communicatorApp.controller('cardsCtrl', function($scope, $ionicPopup, cardDbService, listItemDeleteService) {
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

    $scope.$on("delete", function(scope, card) {
        cardDbService.delete(card);
        $scope.cards.splice($scope.cards.indexOf(card), 1);
    });

    $scope.ask = function() {
        $ionicPopup.alert({
            title: 'Ayuda',
            template: 'Para agregar un pictograma se debe presionar el signo + de arriba a la derecha. <br> Para eliminar un pictograma se lo debe mantener presionado unos segundos y aparecerá un signo - a su izquierda que permitirá eliminarlo.'
        });
    };

});