communicatorApp.controller('configurationsServerCtrl', function($scope, $ionicNavBarDelegate, serverService) {
    $scope.lastSyncTime = '';
    $scope.autoSyncEnabled = false;

    serverService.getCurrentConfiguration().then(function(configuration) {
        $scope.lastSyncTime = configuration.lastSyncTime;
        $scope.autoSyncEnabled = configuration.autoSyncEnabled === 'true' ? true : false;
    });

    $scope.toggleAutoSync = function(enabled) {
        serverService.setAutoSync(enabled);
    };

    $scope.sync = function() {
        serverService.sync().then(function(syncTime) {
            $scope.lastSyncTime = syncTime;
        });
    };

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        $scope.goBack();
    };
});