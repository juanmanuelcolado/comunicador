communicatorApp.service('exchangeDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Exchange').define('getLastExchange', function() {
    	return {
    		query: 'SELECT * FROM '+ this.tableName +' ORDER BY datetime(date) DESC Limit 1'
    	};
    });
});