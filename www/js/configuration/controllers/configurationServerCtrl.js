communicatorApp.controller('configurationsServerCtrl', function($scope, serverService) {
    $scope.lastSyncTime = '';
    $scope.autoSyncEnabled = false;
    $scope.baseURL = '';

    serverService.getBaseURL().then(function(baseURL) {
        $scope.baseURL = baseURL;
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

    $scope.save = function() {
        serverService.setBaseURL($scope.baseURL);
        $scope.goBack();
    };
});