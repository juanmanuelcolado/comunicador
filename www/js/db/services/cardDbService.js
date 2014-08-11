communicatorApp.service('cardDbService', function(QueryBuilder) {
    var queryBuilder = new QueryBuilder('Card');

    return {
        getAll: function() {
            return queryBuilder.all();
        },
        getSingle: function(id) {
            return queryBuilder.getById(id);
        },
        add: function(card) {
            return queryBuilder.insert(card);
        },
        edit: function(card) {
            return queryBuilder.update(card);
        }
    };
});