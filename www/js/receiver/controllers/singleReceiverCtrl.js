communicatorApp.controller('singleReceiverCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicModal, receiverDbService, imageUploaderService) {
    $scope.creating = !$stateParams.id;
    $scope.defaultAvatar = imageUploaderService.defaultSrc;

    $scope.receiver = {
        name: '',
        lastName: '',
        avatar: '',
        advanced: false,
        pattern: ''
    };

    if (!$scope.creating) {
        receiverDbService.find($stateParams.id).then(function(results) {
            $scope.receiver = results[0];
            $scope.receiver.advanced = $scope.receiver.advanced === 'true' ? true : false;
            $scope.receiver.avatar = $scope.receiver.avatar || $scope.defaultAvatar;
        });
    }

    $ionicModal.fromTemplateUrl('templates/receiver/receiverPatternEdit.html', {
        scope: $scope,
        animation: 'slide-in-right',
        backdropClickToClose: true
    }).then(function(modal) {
        $scope.patternModal = modal;
    });

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.patternModal.remove();
    });

    $scope.editPattern = function() {
        $scope.patternModal.show();
    };

    $scope.takePicture = function() {
        imageUploaderService.takePicture(function(newImageSrc) {
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
