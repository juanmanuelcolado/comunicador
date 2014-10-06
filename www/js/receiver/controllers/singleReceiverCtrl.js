communicatorApp.controller('singleReceiverCtrl', function($scope, $stateParams, $state, $ionicNavBarDelegate, $ionicModal, $ionicPopup, receiverDbService, relationshipDbService, imageUploaderService, uuidService) {
    $scope.creating = !$stateParams.id;
    $scope.cameraIsEnabled = imageUploaderService.cameraIsEnabled;

    $scope.receiver = {
        name: '',
        lastName: '',
        relationshipId: 0,
        avatar: '',
        advanced: false,
        pattern: ''
    };

    if (!$scope.creating) {
        receiverDbService.find($stateParams.id).then(function(results) {
            $scope.receiver = results[0];
            $scope.receiver.advanced = $scope.receiver.advanced === 'true' ? true : false;
            $scope.receiver.avatar = $scope.receiver.avatar;
        });
    }

    relationshipDbService.selectAll().then(function(relationships){
        $scope.relationships = relationships;
    });

    $scope.uploadImage = function() {
        if (imageUploaderService.cameraIsEnabled) {
            showUploadImagePopup();
        } else {
            takePictureFromWebview();
        }
    };

    var showUploadImagePopup = function() {
        $ionicPopup.show({
            template: '¿Desea tomar una nueva foto o subir una foto de la galería?',
            title: 'Subir foto',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Tomar foto</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.takePicture(updateReceiverAvatar);
                    }
                },
                {
                    text: '<b>Abrir galería</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.pictureFromDevice(updateReceiverAvatar);
                    }
                }
            ]
        });
    };

    var takePictureFromWebview = function() {
        imageUploaderService.pictureFromDevice(updateReceiverAvatar);
    };

    var updateReceiverAvatar = function(newImageSrc) {
        $scope.receiver.avatar = newImageSrc;
        $scope.$apply();
    };

    $ionicModal.fromTemplateUrl('templates/receiver/receiverPatternEdit.html', {
        scope: $scope,
        animation: 'slide-in-right',
        backdropClickToClose: true
    }).then(function(modal) {
        $scope.patternModal = modal;
    });

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        if ($scope.patternModal) {
            $scope.patternModal.remove();
        }
    });

    $scope.editPattern = function() {
        $scope.patternModal.show();
    };

    $scope.save = function() {
        if ($scope.creating) {
            $scope.receiver.uuid = uuidService.generate();
            receiverDbService.insert($scope.receiver);
        } else {
            receiverDbService.update($scope.receiver);
        }
        $ionicNavBarDelegate.back();
    };

    $scope.checkIfAdvancedByDefault = function() {
        var relationship = getRelationshipById($scope.receiver.relationshipId);
        $scope.receiver.advanced = relationship.advancedByDefault === 'true';
    };

    $scope.checkIfHasCustomName = function() {
        var relationship = getRelationshipById($scope.receiver.relationshipId);
        $scope.showRelationshipName = relationship && relationship.hasCustomName === 'true';
    };

    var getRelationshipById = function(relationshipId) {
        var matchedRelationships = $scope.relationships.filter(function(relationship){
            return relationship.id === relationshipId;
        });
        return matchedRelationships.length ? matchedRelationships[0] : undefined;
    };
});
