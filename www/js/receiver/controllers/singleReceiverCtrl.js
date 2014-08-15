communicatorApp.controller('singleReceiverCtrl', function($scope, $stateParams, $ionicNavBarDelegate, receiverDbService, imageUploader) {
    $scope.creating = !$stateParams.id;
    $scope.defaultAvatar = imageUploader.defaultSrc;

    $scope.receiver = {
        name: '',
        lastName: '',
        avatar: '',
        advanced: false
    };

    if (!$scope.creating) {
        receiverDbService.find($stateParams.id).then(function(results) {
            $scope.receiver = results[0];
            $scope.receiver.advanced = $scope.receiver.advanced === 'true' ? true : false;
            $scope.receiver.avatar = $scope.receiver.avatar || $scope.defaultAvatar;
        });
    }

    $scope.takePicture = function() {
        imageUploader.takePicture(function(newImageSrc) {
            $scope.receiver.avatar = newImageSrc;
            $scope.$apply();
        });
    };

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.save = function() {
        if ($scope.receiver.name && $scope.receiver.lastName) {
            if ($scope.creating) {
                receiverDbService.insert($scope.receiver);
            } else {
                receiverDbService.update($scope.receiver);
            }

            $scope.goBack();
        } else {
            // Error! complete all fileds please
        }
    };
});
