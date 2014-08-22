communicatorApp.service('scoreDbService', function(QueryBuilderService) {
    return new QueryBuilderService('Score');
});