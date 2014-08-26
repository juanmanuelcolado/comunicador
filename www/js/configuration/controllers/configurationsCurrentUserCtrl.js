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
        if ($scope.user.name && $scope.user.lastName) {
            currentUserService.set($scope.user);
            $scope.goBack();
        } else {
            // Error! complete all fileds please
        }
    };
});