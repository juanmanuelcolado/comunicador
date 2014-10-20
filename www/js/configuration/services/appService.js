communicatorApp.service('appService', function($q, configurationService) {
    var initKey = "app_initialized";
    return {
        uninitialized: function() {
            var self = this;
            var deferred = $q.defer();
            if (!localStorage.getItem(initKey)) {
                configurationService.get(initKey).then(function(value) {
                    if (value) {
                        deferred.reject();
                        localStorage.setItem(initKey, true);
                    } else {
                        deferred.resolve();
                        self.initialize();
                    }
                });
            } else {
                deferred.reject();
            }
            return deferred.promise;
        },
        initialize: function() {
            configurationService.set(initKey, true);
            localStorage.setItem(initKey, true);
        }
    };
});
