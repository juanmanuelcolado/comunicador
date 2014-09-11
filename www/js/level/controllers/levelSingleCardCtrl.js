communicatorApp.controller('levelSingleCardCtrl', function($scope, $stateParams, $ionicPlatform, $ionicActionSheet, $state, cardDbService, registryService) {
    $scope.card = {
        id: $stateParams.id,
        title: '',
        img: ''
    };

    cardDbService.find($stateParams.id).then(function(results) {
        $scope.card = results[0];
    });

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