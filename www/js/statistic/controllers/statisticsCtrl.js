communicatorApp.controller('statisticsCtrl', function($scope, statisticService) {
    $scope.exchangeCountByReceiver = [];
    $scope.exchanges = undefined;
    $scope.score = {
        withHelp: '✖',
        withPartialHelp: '-',
        withoutHelp: '✓'
    };

    statisticService.exchanges().then(function(result) {
        $scope.exchanges = result;
    });

    statisticService.exchangeCountByReceiver().then(function(result) {
        $scope.exchangeCountByReceiver = result;
    });
});