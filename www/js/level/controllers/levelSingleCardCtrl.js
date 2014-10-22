communicatorApp.controller('levelSingleCardCtrl', function($scope, $stateParams, $ionicPlatform, $ionicActionSheet, $ionicNavBarDelegate, $ionicGesture, $state, tutorialService, cardDbService, registryService) {
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

communicatorApp.directive('detectGestures', function($ionicGesture) {
  return {
    link : function(scope, elem, attrs) {
      
      var gestureType = attrs.gestureType;

      switch(gestureType) {
        case 'hold':
          $ionicGesture.on('hold', scope.menuButtonPressed, elem);
          break;
      }

    }
  };
});