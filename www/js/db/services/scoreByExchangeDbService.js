communicatorApp.service('scoreByExchangeDbService', function(QueryBuilderService) {
    return new QueryBuilderService('ScoreByExchange').define('getLastScoresByExchange', function(exchangeId) {
    	return {
    		query: 'SELECT * FROM ' + this.tableName + ' WHERE exchangeId = ?',
    		args: [exchangeId]
    	};
    });
});