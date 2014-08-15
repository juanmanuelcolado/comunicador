communicatorApp.controller('homeCtrl', function($scope) {
    $scope.phases = [
        { 
            name: 'Nivel 1: Cómo comunicarse',
            selected: true
        },{ 
            name: 'Nivel 2: Distancia y persistencia',
            selected: false
        },{ 
            name: 'Nivel 3: Discriminar imágenes',
            selected: false
        },{ 
            name: 'Nivel 4: Estructura oración',
            selected: false
        },{ 
            name: 'Nivel 5: Responder preguntas',
            selected: false
        },{ 
            name: 'Nivel 6: Comentar',
            selected: false
        }];

    $scope.selectPhase = function(phase) {
        if(phase.name == 'Nivel 1: Cómo comunicarse') {phase.selected = true;}
        else {phase.selected = false;}
    };
});