communicatorApp.controller('statisticsCtrl', function($scope, statisticService) {
    $scope.loaded = false;
    $scope.hasExchanges = false;
    $scope.exchanges = {};
    $scope.exchangeCountByReceiver = [];
    
    $scope.score = {
        withHelp: 'AT',
        withPartialHelp: 'AP',
        withoutHelp: '✓'
    };

    statisticService.exchanges().then(function(result) {
        if (Object.keys(result).length > 0) {
            $scope.hasExchanges = true;
            $scope.exchanges = result;
        }
        $scope.loaded = true;
    });

    statisticService.exchangeCountByReceiver().then(function(result) {
        $scope.exchangeCountByReceiver = result;
    });
});