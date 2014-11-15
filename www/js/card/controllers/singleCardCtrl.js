communicatorApp.controller('singleCardCtrl', function($scope, $stateParams, $ionicNavBarDelegate, cardDbService, imageUploaderService, popupService) {

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

    var takePictureFromWebview = function() {
        imageUploaderService.pictureFromDevice(updateCardImage);
    };

    var updateCardImage = function(newImageSrc) {
        $scope.card.img = newImageSrc;
        $scope.$apply();
    };

    $scope.equalItems = function(value,card) {
        return value.toLowerCase().replace(/\s+/g, '') === card.title.toLowerCase().replace(/\s+/g, '');
    };

    popupService.start($scope, updateCardImage);
});