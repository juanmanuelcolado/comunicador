communicatorApp.controller('cardsCtrl', function($scope, dbService) {
	$scope.cards = [];
	
	dbService.getCards().then(function(results) {
		$scope.cards = results;
	});
});