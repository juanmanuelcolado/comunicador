communicatorApp.directive('menuOnhold', function($ionicGesture) {
    return {
        link : function(scope, elem, attrs) {
            $ionicGesture.on('hold', scope.menuButtonPressed, elem);
        }
    };
});