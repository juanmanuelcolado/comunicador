communicatorApp.directive('cmDeletegestures', function($ionicGesture, listItemDeleteService) {
    return {
        link : function(scope, elem, attrs) {
            $ionicGesture.on('hold', listItemDeleteService.showDeleteButton, elem);

            $ionicGesture.on('tap', function() {
                var model = scope[attrs.modeltodelete];
                if (model) {
                    listItemDeleteService.modelTap(model.id, scope.redirectState);
                }
            }, elem);
        }
    };
});