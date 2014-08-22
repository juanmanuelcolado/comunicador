communicatorApp.controller('homeCtrl', function($scope, levelDbService) {

    var defaultLevels = [
        { 
            levelNumber: 1,
            description: 'Cómo comunicarse',
            selected: true
        },{ 
            levelNumber: 2,
            description: 'Distancia y persistencia',
            selected: false
        },{ 
            levelNumber: 3,
            description: 'Discriminar imágenes',
            selected: false
        },{ 
            levelNumber: 4,
            description: 'Estructura oración',
            selected: false
        },{ 
            levelNumber: 5,
            description: 'Responder preguntas',
            selected: false
        },{ 
            levelNumber: 6,
            description: 'Comentar',
            selected: false

        }];

    levelDbService.selectAll().then(function(results) {
		$scope.levels = results.concat(defaultLevels);
    });

    $scope.selectLevel = function(level) {
        if(level.description == 'Cómo comunicarse') {level.selected = true;}
        else {level.selected = false;}
    };
});