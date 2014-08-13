communicatorApp.controller('patternLockCtrl', function($scope, $state, $ionicNavBarDelegate, $ionicPopup, currentReceptorService) {
	
	var lock = new PatternLock("#lock", { 
		margin: getMarginSize(),
		onDraw: validatePattern
	});

	function validatePattern (pattern) {
		if (currentReceptorService.receptor.pattern === pattern) {
			//$state.go('app.patternLock');
		} else {
			lock.error();
			showConfirmPopup();
		}
	}

	function showConfirmPopup () {
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

	function getMarginSize () {
		var containerSize = window.screen.width - 60;
		var columnSize = containerSize/3;
		var extraSpace = columnSize - 50;
		var marginSize = extraSpace / 2;
		return marginSize;
	}
});