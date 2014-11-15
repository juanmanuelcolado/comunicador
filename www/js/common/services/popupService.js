communicatorApp.service('popupService', function($ionicPopup, imageUploaderService) {
    var popup, pictureCallback, scope;

    var popupEvent = function() {
        if (event.target.classList.contains('closeTutorial')) {
            if(popup) {
                popup.close();
            }
        }
    };

    var showUploadImagePopup = function() {
        return $ionicPopup.show({
            template: '¿Desea tomar una nueva foto o subir una foto de la galería?',
            title: 'Subir foto' + '&nbsp;<span class="closeTutorial">X</span>',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Tomar foto</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.takePicture(pictureCallback);
                    }
                },
                {
                    text: '<b>Abrir galería</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        imageUploaderService.pictureFromDevice(pictureCallback);
                    }
                }
            ]
        });
    };

    return {
        start: function($scope, callback) {
            scope = $scope;
            pictureCallback = callback;

            document.addEventListener('click', popupEvent, false);

            $scope.$on("$destroy", function() {
                console.log("destroy");
                document.removeEventListener('click', popupEvent);
            });
        },
        show: function() {
            popup = showUploadImagePopup();
        }
    };
});   
