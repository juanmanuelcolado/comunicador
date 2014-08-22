communicatorApp.controller('cardsCtrl', function($scope, $ionicGesture, $timeout, cardDbService) {
    $scope.cards = [];
    $scope.showDelete = false;
    $scope.showConfirm = false;
    
    
    cardDbService.selectAll().then(function(results) {
        $scope.cards = results;
    });

    $scope.showDeleteButton = function(){
    	$timeout(function() {
    		$scope.showDelete = true;
    		$scope.deletedCards = [];
    	});
    };

    $scope.deleteCard = function(card){
    	$scope.deletedCards.push(card);
    	$scope.cards.splice($scope.cards.indexOf(card),1);
    	$scope.showConfirm = true;
    };

    $scope.permanentlyDelete = function(){
    	$scope.deletedCards.forEach(function(card){
    		cardDbService.delete(card);
    	});
    	$scope.showDelete = false;
    	$scope.showConfirm = false;
    };

    $scope.undo = function(){
    	$scope.cards = $scope.cards.concat($scope.deletedCards);
    	$scope.deletedCards = [];
    	$scope.showDelete = false;
    	$scope.showConfirm = false;
    };
})

.directive('deleteHold', function($ionicGesture) {
	return {
		link : function(scope, elem, attrs) {
			$ionicGesture.on('hold', scope.showDeleteButton, elem);
		}
	};
});