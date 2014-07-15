communicatorApp.controller('homeCtrl', function($scope) {
	$scope.fases = [
		{ 
			name: 'Fase 1',
			selected: true
		},{ 
			name: 'Fase 2',
			selected: false
		},{ 
			name: 'Fase 3',
			selected: false
		},{ 
			name: 'Fase 4',
			selected: false
		},{ 
			name: 'Fase 5',
			selected: false
		},{ 
			name: 'Fase 6',
			selected: false
		}];

	$scope.selectFase = function(fase) {
		$scope.fases.map(function(item) { item.selected = false; });
		fase.selected = true;
	};
});