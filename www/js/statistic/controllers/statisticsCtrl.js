communicatorApp.controller('statisticsCtrl', function($scope, statisticService) {
    $scope.loaded = false;
    $scope.exchangeCountByReceiver = [];
    $scope.exchanges = undefined;
    $scope.score = {
        withHelp: '✖',
        withPartialHelp: '-',
        withoutHelp: '✓'
    };

    statisticService.exchanges().then(function(result) {
        $scope.exchanges = result;
        $scope.loaded = true;
    });

    statisticService.exchangeCountByReceiver().then(function(result) {
        $scope.exchangeCountByReceiver = result;
    });
});