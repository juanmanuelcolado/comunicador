communicatorApp.controller('configurationsServerCtrl', function($scope, $ionicNavBarDelegate, serverService, currentUserService) {
    $scope.lastSyncTime = '';
    $scope.autoSyncEnabled = false;
    $scope.baseURL = '';
    $scope.userSet = true;

    serverService.getBaseURL().then(function(baseURL) {
        $scope.baseURL = baseURL;
    });

    currentUserService.get().then(function(user) {
        $scope.userSet = !!user.name;
    });

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

    $scope.clear = function() {
        serverService.clearSyncData();
    };

    $scope.save = function() {
        serverService.setBaseURL($scope.baseURL);
        $ionicNavBarDelegate.back();
    };
});