communicatorApp.controller('configurationsCurrentUserCtrl', function($scope, $ionicNavBarDelegate, currentUserService) {
    $scope.user = {
        name: '',
        lastName: '',
        birthdate: ''
    };

    currentUserService.get().then(function(user) {
        $scope.user = user;
    });
    
    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        currentUserService.set($scope.user);
        $scope.goBack();
    };
});