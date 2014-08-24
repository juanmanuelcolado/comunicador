communicatorApp.controller('patternLockCtrl', function($scope, $state, $ionicNavBarDelegate, $ionicPopup, receiverDbService, currentReceiverService) {
	
	var lock = new PatternLock("#lock", { 
		margin: getMarginSize(),
		onDraw: validatePattern
	});

	function validatePattern (pattern) {
		receiverDbService.selectAll().then(function(receivers) {
			var matchingReceivers = receivers.filter(function(receiver) {
				//return receiver.pattern === pattern;
				return '123' === pattern;
			});

			switch(matchingReceivers.length){
				case 0: {
					lock.error();
					showWrongPassPopup();
					break;
				}
				case 1: {
					selectReceiver(matchingReceivers[0]);
					break;
				}
				default: {
					showConflictPopup(matchingReceivers);
				}
			}			
		});	
	}

	function showWrongPassPopup () {
     	var confirmPopup = $ionicPopup.confirm({
       		title: 'Contraseña incorrecta',
	       	template: '¿Desea intentarlo de nuevo?'
     	});

	    confirmPopup.then(function(response) {
	       	if(response) {
	        	lock.reset();
	       	} else {
				$ionicNavBarDelegate.back();
	       	}
     	});
	}

	function selectReceiver (receiver) {
		currentReceiverService.receiver = receiver;
		$state.go(receiver.advanced == 'true'? 'app.advancedRegistry' : 'app.basicRegistry');
	}

	function showConflictPopup (conflictingReceivers) {
		$scope.conflictingReceivers = conflictingReceivers;
		$scope.selectedReceiver = conflictingReceivers[0];
		var selectReceiversTemplate = '<ion-radio ng-repeat="receiver in conflictingReceivers" ng-value="receiver" ng-model="selectedReceiver">{{ receiver.name + " " + receiver.lastName }}</ion-radio>';
     	var confirmPopup = $ionicPopup.confirm({
       		title: 'Multiples receptores encontrados',
	       	template: 'Se encontró más de un receptor con el patrón ingresado. <br>Considere cambiar su patrón para no volver a tener este conflicto. <br><br> Seleccione el receptor deseado: ' + selectReceiversTemplate,
	       	scope: $scope
     	});

     	confirmPopup.then(function(accept) {
     		if (accept) {
     			selectReceiver($scope.selectedReceiver);
     		} else {
     			$ionicNavBarDelegate.back();
     		}
     	});
	}

	function getMarginSize () {
		var containerSize = window.innerWidth - 80;
		var columnSize = containerSize/3;
		var extraSpace = columnSize - 50;
		var marginSize = extraSpace / 2;
		return marginSize;
	}
});