communicatorApp.controller('configurationSyncCtrl', function($scope, $ionicNavBarDelegate, serverService, currentUserService) {
    $scope.lastSyncTime = '';
    $scope.autoSyncEnabled = false;
    $scope.shouldSync = true;

    serverService.getCurrentConfiguration().then(function(configuration) {
        $scope.lastSyncTime = configuration.lastSyncTime && new Date(configuration.lastSyncTime);
        $scope.autoSyncEnabled = configuration.autoSyncEnabled === 'true' ? true : false;
        $scope.shouldSync = configuration.dataToSync !== undefined;
    });

    $scope.toggleAutoSync = function(enabled) {
        serverService.setAutoSync(enabled);
    };

    $scope.sync = function() {
        serverService.sync().then(function(syncTime) {
            $scope.lastSyncTime = new Date(syncTime);
            $scope.shouldSync = false;
        });
    };

    $scope.save = function() {
        $ionicNavBarDelegate.back();
    };
});