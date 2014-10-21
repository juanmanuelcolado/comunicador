communicatorApp.controller('receiversCtrl', function($scope, $state, $timeout, $ionicPopup, receiverDbService, listItemDeleteService) {
    $scope.loaded = false;
    $scope.receivers = [];
    $scope.eraser = listItemDeleteService;
    $scope.redirectState = "app.singleReceiver";
    $scope.eraser.showDelete = false;

    receiverDbService.notInternal().then(function(results) {
        $scope.receivers = results;
        $scope.loaded = true;
    });

    $scope.$on("delete", function(scope, card) {
        receiverDbService.delete(card);
        $scope.receivers.splice($scope.receivers.indexOf(card), 1);
    });

    $scope.ask = function() {
        $ionicPopup.alert({
            title: 'Ayuda',
            template: 'Para agregar un receptor se debe presionar el signo + de arriba a la derecha. <br> Para eliminar un receptor se lo debe mantener presionado unos segundos y aparecerá un signo - a su izquierda que permitirá eliminarlo.'
        });
    };

});
