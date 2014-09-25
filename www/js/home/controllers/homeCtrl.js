communicatorApp.controller('homeCtrl', function($scope, levelDbService, $ionicPopup) {
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

    $scope.selectLevel = function(levels, level) {
        var levelEnabled = false;
        for (var i = 0; i < levels.length; i++) {
            levels[i].selected = false;
        }
        levelDbService.selectAll().then(function(results) {
            for (var i = 0; i < results.length; i++) {
                if (results[i].description == level.description && results[i].enabled == "true"){
                    level.selected = true;
                    levelEnabled = true;
                    $scope.selectedLevel = level;
                }
            }
            if(!levelEnabled){
                levels[0].selected = true;
                $scope.selectedLevel = levels[0];
                showPopUp();
            }
        });
    };

    function showPopUp(){
        var alertPopup = $ionicPopup.alert({
             title: 'Próximamente',
             template: 'El nivel seleccionado todavía no se encuentra habilitado'
        });
        alertPopup.then(function(res) {
            console.log('Nivel no habilitado');
        });
    }
});
