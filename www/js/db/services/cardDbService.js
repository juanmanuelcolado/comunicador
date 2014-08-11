communicatorApp.service('cardDbService', function(QueryBuilder) {
    var queryBuilder = new QueryBuilder('Card');

    return {
        getCards: function() {
            return queryBuilder.all();
        },
        getSingleCard: function(id) {
            return queryBuilder.getById(id);
        },
        addCard: function(card) {
            return queryBuilder.insert(card);
        },
        editCard: function(card) {
            return queryBuilder.update(card);
        }
    };
});