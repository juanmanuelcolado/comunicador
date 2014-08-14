communicatorApp.controller('singleReceptorCtrl', function($scope, $stateParams, $ionicNavBarDelegate, receptorDbService, imageUploader) {
    $scope.creating = !$stateParams.id;
    $scope.defaultAvatar = imageUploader.defaultSrc;

    $scope.receptor = {
        name: '',
        lastName: '',
        avatar: '',
        advanced: false
    };

    if (!$scope.creating) {
        receptorDbService.find($stateParams.id).then(function(results) {
            $scope.receptor = results[0];
            $scope.receptor.advanced = $scope.receptor.advanced === 'true' ? true : false;
            $scope.receptor.avatar = $scope.receptor.avatar || $scope.defaultAvatar;
        });
    }

    $scope.takePicture = function() {
        imageUploader.takePicture(function(newImageSrc) {
            $scope.receptor.avatar = newImageSrc;
            $scope.$apply();
        });
    };

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.receptor.name && $scope.receptor.lastName) {
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
