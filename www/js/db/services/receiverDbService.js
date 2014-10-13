communicatorApp.service('receiverDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Receiver')
        .define("allNotInternal", function() {
            return {
                query: 'SELECT * FROM ' + this.tableName + ' WHERE internal = ?',
                args: [false]
            };
        });
});

