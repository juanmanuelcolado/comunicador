communicatorApp.controller('receiversCtrl', function($scope, $state, $timeout, receiverDbService, listItemDeleteService) {
    $scope.receivers = [];
    $scope.eraser = listItemDeleteService;
    $scope.redirectState = "app.singleReceiver";

    receiverDbService.selectAll().then(function(results) {
        $scope.receivers = results;
    });

    $scope.$on("delete", function(scope, card) {
        receiverDbService.delete(card);
        $scope.receivers.splice($scope.receivers.indexOf(card), 1);
    });
});
