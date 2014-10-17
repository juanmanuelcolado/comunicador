communicatorApp.controller('homeCtrl', function($scope, $ionicPopup, $stateParams, tutorialService, levelDbService) {
    levelDbService.selectAll().then(function(results) {
        $scope.levels = results;
        var lastLevel = 0;
        var lastDate = $scope.levels[0].initDate;
        for (var i = 0; i < $scope.levels.length; i++) {
            if ($scope.levels[i].initDate > lastDate){
                lastLevel = i;
            }
        }
        $scope.levels[lastLevel].selected = true;
        $scope.selectedLevel = $scope.levels[lastLevel];
    });

    $scope.selectLevel = function(level) {
        if ($scope.selectedLevel.id === level.id) {
            level.selected = !level.selected;
        } else {
            if (level.enabled === "true") {
                $scope.selectedLevel.selected = false;
                level.selected = true;
                $scope.selectedLevel = level;
            } else {
                $ionicPopup.alert({
                    title: 'Próximamente',
                    template: 'El nivel seleccionado todavía no se encuentra habilitado'
                });
            }
        }
    };

    tutorialService.showIfActive();
});
