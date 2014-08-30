communicatorApp.directive('cmDeletegestures', function($ionicGesture, listItemDeleteService) {
    return {
        link : function(scope, elem, attrs) {
            $ionicGesture.on('hold', listItemDeleteService.showDeleteButton, elem);
            $ionicGesture.on('tap', function(){
                listItemDeleteService.modelTap(scope.card.id, scope.redirectState);
            }, elem);
        }
    };
});