communicatorApp.controller('singleReceptorCtrl', function($scope, $stateParams, $ionicNavBarDelegate, receptorDbService) {
    $scope.creating = !$stateParams.id;
    $scope.defaultAvatar = 'img/ionic.png';

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
        if(navigator.camera) {
            navigator.camera.getPicture(function(newImageSrc) {
                $scope.receptor.avatar = newImageSrc;
                $scope.$apply();
            }, function() {});
        } else {
            // alert an error "no camera found" ?
            // create file input without appending to DOM
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');

            fileInput.onchange = function() {
                var file = fileInput.files[0];
                var reader = new FileReader();
                reader.onloadend = function () {
                    var encodedData = reader.result;
                    $scope.receptor.avatar = encodedData;
                    $scope.$apply();
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
            };
            document.body.appendChild(fileInput);
            fileInput.click();
        }
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
