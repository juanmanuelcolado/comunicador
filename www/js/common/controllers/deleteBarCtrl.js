communicatorApp.controller('deleteBarCtrl', function($scope, listItemDeleteService) {
    $scope.showConfirm = false;

    var hide = function() {
        $scope.showConfirm = false;
    };
    var show = function() {
        $scope.showConfirm = true;
    };

    $scope.permanentlyDelete = function() {
        hide();
        listItemDeleteService.delete();
    };

    $scope.undo = function() {
        hide();
        listItemDeleteService.deleteCanceled();
    };

    $scope.$on('selectedToDelete', show);
    $scope.$on('cancelDelete', $scope.undo);
});