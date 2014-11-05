communicatorApp.controller('configurationDeveloperToolsCtrl', function($scope, $ionicNavBarDelegate, serverService, currentUserService) {
    $scope.url = {
        base: ''
    };
    $scope.userSet = true;
    $scope.hasSyncData = false;

    serverService.getBaseURL().then(function(baseURL) {
        $scope.url.base = baseURL;
    });

    currentUserService.get().then(function(user) {
        $scope.userSet = !!user.name;
    });

    serverService.getCurrentConfiguration().then(function(configuration) {
        $scope.hasSyncData = configuration.dataToSync !== undefined;
    });

    $scope.clear = function() {
        serverService.clearSyncData();
        $scope.hasSyncData = false;
    };

    $scope.save = function() {
        serverService.setBaseURL($scope.url.base);
        $ionicNavBarDelegate.back();
    };
});