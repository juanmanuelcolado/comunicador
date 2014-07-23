communicatorApp.controller('homeCtrl', function($scope) {
	$scope.phases = [
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

	$scope.selectPhase = function(phase) {
		$scope.phases.map(function(item) { item.selected = false; });
		phase.selected = true;
	};
});