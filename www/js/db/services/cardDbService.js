communicatorApp.service('cardDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Card')
        .define("selectEnabled", function(key) {
            return {
                query: 'SELECT * FROM ' + this.tableName + ' WHERE enabled = ?',
                args: [true]
            };
        });
});