communicatorApp.controller('configurationDeveloperToolsCtrl', function($scope, $ionicNavBarDelegate, serverService, currentUserService) {
    $scope.baseURL = '';
    $scope.userSet = true;

    serverService.getBaseURL().then(function(baseURL) {
        $scope.baseURL = baseURL;
    });

    currentUserService.get().then(function(user) {
        $scope.userSet = !!user.name;
    });

    $scope.clear = function() {
        serverService.clearSyncData();
    };

    $scope.save = function() {
        serverService.setBaseURL($scope.baseURL);
        $ionicNavBarDelegate.back();
    };
});