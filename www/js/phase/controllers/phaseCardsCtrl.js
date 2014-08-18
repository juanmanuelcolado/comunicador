communicatorApp.controller('phaseCardsCtrl', function($scope, cardDbService) {
    $scope.cards = [
        {
            title: 'Hello world',
            img: 'hello-world.png'
        },
        {
            title: 'Mamushka',
            img: 'mamushka.png'
        },
        {
            title: 'Monster',
            img: 'monster.png'
        },
        {
            title: 'Octo fun!',
            img: 'octo-fun.png'
        },
        {
            title: 'Peace out!!',
            img: 'peace-out.png'
        }
    ];

    cardDbService.selectEnabled().then(function(results) {
        $scope.cards = results;
    });

});