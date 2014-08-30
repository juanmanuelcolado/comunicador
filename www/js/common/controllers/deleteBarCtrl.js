communicatorApp.controller('deleteBarCtrl', function($scope) {
    $scope.showConfirm = false;

    var hide = function() {
        $scope.showConfirm = false;
    };
    var show = function() {
        $scope.showConfirm = true;
    };

    $scope.permanentlyDelete = function() {
        hide();
        $scope.$emit('deleted');
    };

    $scope.undo = function() {
        hide();
        $scope.$emit('deleteCanceled');
    };

    $scope.$on('selectedToDelete', show);
    $scope.$on('cancelDelete', $scope.undo);
});