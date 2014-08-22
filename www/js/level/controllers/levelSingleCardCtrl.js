communicatorApp.controller('levelSingleCardCtrl', function($scope, $stateParams, $ionicPlatform, $ionicActionSheet, $state, registryService) {
    $scope.card = {
        id: 1, // pasar por parámetro el id y obtener los datos de la tarjeta desde la base
        title: $stateParams.cardTitle,
        img: $stateParams.cardImg
    };

    $scope.menuButtonPressed = function() {
        $ionicActionSheet.show({
            buttons: [
                { text: 'Puntuar' },
                { text: 'Cerrar Menu'}
            ],
            titleText: 'Tarjeta \''+ $scope.card.title +'\'',
            cancelText: 'Cancelar',
            buttonClicked: function(index) {
                if (index === 0) {
                    registryService.pickedCardId = $scope.card.id;
                    $state.go('app.patternLock');
                }
                return true;
            }
        });

    };
    $ionicPlatform.ready(function() {
        document.addEventListener('menubutton', $scope.menuButtonPressed, false);
    });
});