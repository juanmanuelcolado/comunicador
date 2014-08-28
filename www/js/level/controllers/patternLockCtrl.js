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
		$scope.radioInputs = {
			selectedReceiver: conflictingReceivers[0]
		};
     	var confirmPopup = $ionicPopup.show({
       		title: 'Multiples receptores encontrados',
	       	templateUrl: 'templates/level/selectReceiverPopup.html',
	       	scope: $scope,
	       	buttons: [
      			{ 
      				text: 'Cancelar',
      				onTap: function() {
     					$ionicNavBarDelegate.back();
      				}
      			},
  				{
        			text: 'Aceptar',
        			type: 'button-positive',
        			onTap: function() {
     					selectReceiver($scope.radioInputs.selectedReceiver);
        			}
  				}
    		]
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