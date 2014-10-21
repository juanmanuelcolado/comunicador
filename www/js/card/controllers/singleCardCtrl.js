communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicPopup, cardDbService, imageUploaderService) {
    var popup;

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('closeTutorial')) {
        document.removeEventListener('click', this.event);
        if(popup)
            popup.close();
        }
    }, false);

    $scope.creating = !$stateParams.id;
    $scope.cameraIsEnabled = imageUploaderService.cameraIsEnabled;
    
    $scope.card = {
        title: '',
        img: '',
        enabled: true
    };

    $scope.last = {
        title: '',
        img: '',
        enabled: true
    };

    if (!$scope.creating) {
        cardDbService.find($stateParams.id).then(function(results) {
            $scope.card = results[0];
            $scope.last = jQuery.extend(true, {}, $scope.card);
            $scope.card.enabled = $scope.card.enabled === 'true' ? true : false;
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

    $scope.uploadImage = function() {
        if (imageUploaderService.cameraIsEnabled) {
            showUploadImagePopup();
        } else {
            takePictureFromWebview();
        }
    };

    var showUploadImagePopup = function() {
        popup = $ionicPopup.show({
            template: '¿Desea tomar una nueva foto o subir una foto de la galería?',
            title: 'Subir foto' + '&nbsp;<span class="closeTutorial">X</span>',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Tomar foto</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.takePicture(updateCardImage);
                    }
                },
                {
                    text: '<b>Abrir galería</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.pictureFromDevice(updateCardImage);
                    }
                }
            ]
        });
    };

    var takePictureFromWebview = function() {
        imageUploaderService.pictureFromDevice(updateCardImage);
    };

    var updateCardImage = function(newImageSrc) {
        $scope.card.img = newImageSrc;
        $scope.$apply();
    };

    $scope.equalItems = function(value,card){
        return value.toLowerCase().replace(/\s+/g, '') === card.title.toLowerCase().replace(/\s+/g, '');};
});