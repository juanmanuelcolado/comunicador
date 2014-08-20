communicatorApp.service('configurationDbService', function(QueryBuilderService) {
    var queryBuilder = new QueryBuilderService("Configuration");

	queryBuilder.define("find", function(key) {
        return {
            query: 'SELECT * FROM ' + this.tableName + ' WHERE key = ?',
            args: [key]
        };
    });

	queryBuilder.set = function(configuration) {
    	var self = this;
    	return this.find(configuration.key).then(function(results) {
    		if (results.length) {
    			configuration.id = results[0].id;
    			return self.update(configuration);
    		} else {
    			return self.insert(configuration);
    		}
    	});
    };
	
	return queryBuilder
});