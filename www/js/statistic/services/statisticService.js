communicatorApp.service('statisticService', function($q,
                                                    receiverDbService, exchangeDbService,
                                                    exchangeByCardDbService, cardDbService,
                                                    scoreByExchangeDbService, scoreDbService,
                                                    stepDbService) {
    var r   = receiverDbService;
    var e   = exchangeDbService;
    var ebc = exchangeByCardDbService;
    var c   = cardDbService;
    var sbe = scoreByExchangeDbService;
    var s   = scoreDbService;
    var sp  = stepDbService;

    receiverDbService
        .define("exchangeCountByReceiver", function(key) {
            return {
                query: 'SELECT name as receiverName, COUNT(receiverId) as count FROM ' + this.tableName +
                       ' LEFT JOIN ' + e.tableName + ' ON ' + this.prop('id') + ' = receiverId' +
                       ' GROUP BY receiverId, name',
                args: []
            };
        });

    exchangeDbService
        .define("exchanges", function(key) {
            return {
                query: 'SELECT ' +
                            e.prop('id')    + ' as id,' +
                            e.prop('date')  + ' as date,' +
                            r.prop('name')  + ' as receiverName,' +
                            c.prop('title') + ' as cardTitle,' +
                            s.prop('name')  + ' as scoreName,' +
                            sp.prop('name') + ' as stepName' +
                        ' FROM ' + this.tableName +
                       ' JOIN ' + r.tableName   + ' ON ' + r.prop('id') +           ' = ' + this.prop('receiverId') +
                       ' JOIN ' + ebc.tableName + ' ON ' + ebc.prop('exchangeId') + ' = ' + this.prop('id') +
                       ' JOIN ' + c.tableName   + ' ON ' + c.prop('id') +           ' = ' + ebc.prop('cardId') +
                       ' JOIN ' + sbe.tableName + ' ON ' + sbe.prop('exchangeId') + ' = ' + this.prop('id') +
                       ' JOIN ' + s.tableName   + ' ON ' + s.prop('id') +           ' = ' + sbe.prop('scoreId') +
                       ' JOIN ' + sp.tableName  + ' ON ' + sp.prop('id') +          ' = ' + sbe.prop('stepId') +
                       ' GROUP BY stepId, id, date, receiverName, cardTitle, scoreName, stepName',
                args: []
            };
        });

    return {
        exchangeCountByReceiver: function() {
            return receiverDbService.exchangeCountByReceiver();
        },
        exchanges: function() {
            var deferred = $q.defer();

            exchangeDbService.exchanges().then(function(result) {
                var exchanges = result.reduce(function(memo, current) {
                    if (!memo[current.id]) {
                        memo[current.id] = current;
                    }
                    memo[current.id][current.stepName] = current.scoreName;
                    return memo;
                }, {});
                deferred.resolve(exchanges);
            });
            
            return deferred.promise;
        }
    };
});