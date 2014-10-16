communicatorApp.controller('receiversCtrl', function($scope, $state, $timeout, receiverDbService, listItemDeleteService) {
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
});
