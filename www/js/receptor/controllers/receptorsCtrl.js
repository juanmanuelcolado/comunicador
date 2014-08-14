communicatorApp.controller('receptorsCtrl', function($scope, receptorDbService) {
    $scope.receptors = [];
    
    receptorDbService.selectAll().then(function(results) {
        results.forEach(function(receptor) {
            receptor.advanced = receptor.advanced === 'true' ? true : false;
            $scope.receptors.push(receptor);
        });
    });

    $scope.delete = function(receptor) {
        if (window.confirm("¿Está seguro de que quiere eliminar el receptor?")) {
            for (var i = 0; i < $scope.receptors.length; i++) {
                if ($scope.receptors[i].id === receptor.id) {
                    $scope.receptors.splice(i, 1);
                    receptorDbService.delete(receptor);
                    break;
                }
            }
        }
    };
});
