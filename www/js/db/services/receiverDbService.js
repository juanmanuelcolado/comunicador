communicatorApp.service('receiverDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Receiver')
        .define("notInternal", function() {
            return {
                query: "SELECT *, (name || ' ' || lastName) as fullName  FROM " + this.tableName + " WHERE internal = ?",
                args: [0]
            };
        });
});

