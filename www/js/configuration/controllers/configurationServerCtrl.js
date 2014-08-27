communicatorApp.controller('configurationsServerCtrl', function($scope, $ionicNavBarDelegate) {
    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };
    $scope.save = function() {
        $scope.goBack();
    };
});