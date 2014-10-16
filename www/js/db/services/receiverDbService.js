communicatorApp.service('receiverDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Receiver')
        .define("notInternal", function() {
            return {
                query: 'SELECT * FROM ' + this.tableName + ' WHERE internal = ?',
                args: [0]
            };
        });
});

