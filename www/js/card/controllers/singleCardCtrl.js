communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, cardDbService) {
    $scope.creating = !$stateParams.id;
    
    $scope.card = {
        Title: ''
    };

    if (!$scope.creating) {
        cardDbService.getSingleCard($stateParams.id).then(function(results) {
            $scope.card = results[0];
        });
    }

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.creating) {
            cardDbService.addCard($scope.card);
        } else {
            cardDbService.editCard($scope.card);
        }

        $scope.goBack();
    };

});