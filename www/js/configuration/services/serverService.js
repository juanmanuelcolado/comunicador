communicatorApp.service('serverService', function(configurationService) {
    var initKey = "initialized";
    return {
        getLastSynchronizationTime: function() {
            return configurationService.get("server_last_synchronization_time");
        },
        synchronize: function() {
            var syncDate = new Date().toUTCString();
            configurationService.set("server_last_synchronization_time", syncDate);

            return syncDate;
        }
    };
});
