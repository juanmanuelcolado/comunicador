communicatorApp.controller('homeCtrl', function($scope, levelDbService) {
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
                }
            }
        });
        //if the selected level is disabeld then we select the first level
        if(!levelEnabled){
            levels[0].selected = true;
            //TODO: message "El nivel seleccionado no se encuentra disponible"
        }
    };
});