communicatorApp.service('cardDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Card');
});