communicatorApp.service('appService', function(configurationService, $q) {
    var initKey = "initialized";
    return {
        uninitialized: function() {
            var deferred = $q.defer();
            if (!localStorage.getItem(initKey)) {
                configurationService.get(initKey).then(function(value) {
                    if (value) {
                        localStorage.setItem(initKey, true);
                    } else {
                        deferred.resolve();
                    }
                });
            }
            return deferred.promise;
        },
        initialize: function() {
            configurationService.set(initKey, true);
            localStorage.setItem(initKey, true);
        }
    };
});
