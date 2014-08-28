communicatorApp.controller('cardsCtrl', function($scope, $state, $timeout, cardDbService) {
    $scope.cards = [];
    $scope.showDelete = false;
    $scope.showConfirm = false;
    
    cardDbService.selectAll().then(function(results) {
        $scope.cards = results;
    });

    $scope.showDeleteButton = function(){
    	$timeout(function() {
    		$scope.showDelete = true;
            $scope.touchedDeleteButton = false;
    		$scope.selectedCardsToDelete = [];
    	});
    };

    $scope.cardTap = function(id){
        $timeout(function() {
            if($scope.showDelete){               
                if($scope.touchedDeleteButton) {   
                    $scope.touchedDeleteButton = false;
                } else {
                    $scope.undo();
                }
            } else {
                $state.go('app.singleCard', {id: id});
            }
        });
    };

    $scope.selectToDelete = function(card){
        $scope.touchedDeleteButton = true;
        if($scope.selectedCardsToDelete.indexOf(card) == -1){
            card.selectedToDelete = true;
        	$scope.selectedCardsToDelete.push(card);
        	$scope.showConfirm = true;
            $scope.changeStyle(card);
        }

    };

    $scope.changeStyle = function(card){
        if(card.selectedToDelete){
            return {"color":"red"};
        } else {
            return {"color":"black"};
        }
    };

    $scope.permanentlyDelete = function(){
    	$scope.selectedCardsToDelete.forEach(function(card){
    		cardDbService.delete(card);
            $scope.cards.splice($scope.cards.indexOf(card),1);
    	});
    	$scope.showDelete = false;
    	$scope.showConfirm = false;
    };

    $scope.undo = function(){
        angular.forEach($scope.selectedCardsToDelete,function(card){
            delete card.selectedToDelete;
            $scope.changeStyle(card);
        });
        $scope.selectedCardsToDelete = [];
        $scope.touchedDeleteButton = false;
    	$scope.showDelete = false;
    	$scope.showConfirm = false;
    };
})

.directive('gestures', function($ionicGesture) {
	return {
		link : function(scope, elem, attrs) {
                $ionicGesture.on('hold', scope.showDeleteButton, elem);
                $ionicGesture.on('tap', function(){scope.cardTap(scope.card.id);}, elem);
		}
	};
});

