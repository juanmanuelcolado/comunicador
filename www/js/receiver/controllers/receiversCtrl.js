communicatorApp.controller('receiversCtrl', function($scope, receiverDbService) {
    $scope.receivers = [];
    
    receiverDbService.selectAll().then(function(results) {
        results.forEach(function(receiver) {
            receiver.advanced = receiver.advanced === 'true' ? true : false;
            $scope.receivers.push(receiver);
        });
    });

    $scope.delete = function(receiver) {
        if (window.confirm("¿Está seguro de que quiere eliminar el receiver?")) {
            for (var i = 0; i < $scope.receivers.length; i++) {
                if ($scope.receivers[i].id === receiver.id) {
                    $scope.receivers.splice(i, 1);
                    receiverDbService.delete(receiver);
                    break;
                }
            }
        }
    };
});
