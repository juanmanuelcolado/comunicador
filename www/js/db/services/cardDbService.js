communicatorApp.service('cardDbService', function(QueryBuilder) {
    return new QueryBuilder('Card');
});