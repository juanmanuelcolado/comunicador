communicatorApp.controller('configurationsServerCtrl', function($scope, $ionicNavBarDelegate, serverService) {
    $scope.lastSynchronizationTime = '';

    serverService.getLastSynchronizationTime().then(function(lastSynchronizationTime) {
        $scope.lastSynchronizationTime = lastSynchronizationTime;
    });

    $scope.synchronize = function() {
        $scope.lastSynchronizationTime = serverService.synchronize();
    };

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        $scope.goBack();
    };
});