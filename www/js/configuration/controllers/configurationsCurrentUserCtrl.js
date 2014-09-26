communicatorApp.controller('configurationsCurrentUserCtrl', function($scope, currentUserService) {
    $scope.user = {
        name: '',
        lastName: '',
        birthdate: ''
    };

    currentUserService.get().then(function(user) {
        $scope.user = user;
    });

    $scope.save = function() {
        currentUserService.set($scope.user);
        $scope.goBack();
    };
});