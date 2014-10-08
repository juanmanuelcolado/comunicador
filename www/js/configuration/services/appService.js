communicatorApp.service('appService', function() {
    var schemaKey = "app_schema_exists";
    return {
        schemaExists: function() {
            return !!localStorage.getItem(schemaKey);
        },
        schemaCreated: function() {
            localStorage.setItem(schemaKey, true);
        }
    };
});
