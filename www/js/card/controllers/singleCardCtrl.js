communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, cardDbService) {
    $scope.creating = !$stateParams.id;
    
    $scope.card = {
        title: '',
        enabled: true,
        img: "ionic.png"
    };

    if (!$scope.creating) {
        cardDbService.find($stateParams.id).then(function(results) {
            $scope.card = results[0];
        });
    }

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.creating) {
            cardDbService.insert($scope.card);
        } else {
            cardDbService.update($scope.card);
        }

        $scope.goBack();
    };

});