communicatorApp.service('statisticService', function($q,
                                                    receiverDbService, exchangeDbService,
                                                    exchangeByCardDbService, cardDbService,
                                                    scoreByExchangeDbService, scoreDbService,
                                                    stepDbService) {
    var rTable   = receiverDbService.tableName;
    var eTable   = exchangeDbService.tableName;
    var ebcTable = exchangeByCardDbService.tableName;
    var cTable   = cardDbService.tableName;
    var sbeTable = scoreByExchangeDbService.tableName;
    var sTable   = scoreDbService.tableName;
    var stTable  = stepDbService.tableName;

    receiverDbService
        .define("exchangeCountByReceiver", function(key) {
            return {
                query: 'SELECT name as receiverName, COUNT(receiverId) as count FROM ' + this.tableName +
                       ' LEFT JOIN ' + exchangeDbService.tableName + ' ON ' + this.tableName + '.id = receiverId GROUP BY receiverId, name',
                args: []
            };
        });

    exchangeDbService
        .define("exchanges", function(key) {
            return {
                query: 'SELECT Exchange.id as id, Exchange.date as date, Receiver.name as receiverName, Card.title as cardTitle, Score.name as scoreName, Step.name as stepName' +
                       ' FROM ' + this.tableName +
                       ' JOIN ' + rTable   + ' ON ' + rTable + '.id           = ' + this.tableName + '.receiverId' +
                       ' JOIN ' + ebcTable + ' ON ' + ebcTable + '.exchangeId = ' + this.tableName + '.id' +
                       ' JOIN ' + cTable   + ' ON ' + cTable + '.id           = ' + ebcTable + '.cardId' +
                       ' JOIN ' + sbeTable + ' ON ' + sbeTable + '.exchangeId = ' + this.tableName + '.id' +
                       ' JOIN ' + sTable   + ' ON ' + sTable + '.id           = ' + sbeTable + '.scoreId' +
                       ' JOIN ' + stTable  + ' ON ' + stTable + '.id          = ' + sbeTable + '.stepId' +
                       ' GROUP BY ScoreByExchange.stepId, id, date, receiverName, cardTitle, scoreName, stepName',
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