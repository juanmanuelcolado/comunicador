communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, cardDbService) {
    $scope.creating = !$stateParams.id;
    
    $scope.card = {
        title: ''
    };

    if (!$scope.creating) {
        cardDbService.getSingle($stateParams.id).then(function(results) {
            $scope.card = results[0];
        });
    }

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.creating) {
            cardDbService.add($scope.card);
        } else {
            cardDbService.edit($scope.card);
        }

        $scope.goBack();
    };

});