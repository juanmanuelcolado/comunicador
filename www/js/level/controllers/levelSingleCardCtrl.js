communicatorApp.controller('levelSingleCardCtrl', function($scope, $stateParams, $ionicActionSheet, $ionicNavBarDelegate, $state, tutorialService, cardDbService, registryService) {
    $scope.card = {
        id: $stateParams.id,
        title: '',
        img: ''
    };

    var actionSheetUp = false;

    cardDbService.find($stateParams.id).then(function(results) {
        $scope.card = results[0];
    });

    $scope.menuButtonPressed = function() {
        if (!actionSheetUp) {
            showActionSheet();
        }
    };

    var showActionSheet = function() {
        $ionicActionSheet.show({
            buttons: [
                { text: 'Puntuar' }
            ],
            titleText: 'Tarjeta \''+ $scope.card.title +'\'',
            cancelText: 'Cancelar',
            cancel: function() {
                actionSheetUp = false;
                $ionicNavBarDelegate.back();
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    registryService.pickedCardId = $scope.card.id;
                    $state.go('app.patternLock');
                }
                return true;
            }
        });
        actionSheetUp = true;
    };

    $scope.$on('menuButtonPressed', $scope.menuButtonPressed);

    tutorialService.showIfActive();
});