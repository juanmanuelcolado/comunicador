communicatorApp.controller('phaseSingleCardCtrl', function($scope, $stateParams, $ionicPlatform, $ionicActionSheet) {
	$scope.card = {
		title: $stateParams.cardTitle,
		img: $stateParams.cardImg
	};

	$scope.menuButtonPressed = function() {
		$ionicActionSheet.show({
	    	buttons: [
	       		{ text: 'Puntuar' }
	     	],
	     	titleText: 'Tarjeta \''+ $scope.card.title +'\'',
	     	cancelText: 'Cancelar',
	     	buttonClicked: function(index) {
	       		return true;
	     	}
	   	});

	};
	$ionicPlatform.ready(function() {
		document.addEventListener("menubutton", $scope.menuButtonPressed, false);
	});
});