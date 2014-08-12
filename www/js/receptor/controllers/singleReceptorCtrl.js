communicatorApp.controller('singleReceptorCtrl', function($scope, $stateParams, $ionicNavBarDelegate, receptorDbService) {
    $scope.creating = !$stateParams.id;
    
    $scope.receptor = {
        name: '',
        advanced: false
    };

    if (!$scope.creating) {
        receptorDbService.find($stateParams.id).then(function(results) {
            $scope.receptor = results[0];
            $scope.receptor.advanced = $scope.receptor.advanced === 'true' ? true : false;
        });
    }

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.receptor.name) {
            if ($scope.creating) {
                receptorDbService.insert($scope.receptor);
            } else {
                receptorDbService.update($scope.receptor);
            }

            $scope.goBack();
        } else {
            // Error! complete all fileds please
        }
    };
});
