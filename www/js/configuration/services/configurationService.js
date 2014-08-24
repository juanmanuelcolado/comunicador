communicatorApp.service('configurationService', function(configurationDbService, $q) {
    var db = configurationDbService;
    return {
        get: function(key) {
            var deferred = $q.defer();
            db.find(key).then(function(results) {
                var configuration = results.length > 0 ? results[0] : { value: undefined };
                deferred.resolve(configuration.value);
            });
            return deferred.promise;
        },
        set: function(key, value) {
            var configuration = { key: key, value: value };

            return db.find(key).then(function(results) {
                if (results.length) {
                    configuration.id = results[0].id;
                    return db.update(configuration);
                } else {
                    return db.insert(configuration);
                }
            });
        },
        uninitializedApp: function() {
            var deferred = $q.defer();
            if (!localStorage.getItem("initialized")) {
                this.get("initialized").then(function(value) {
                    if (value) {
                        localStorage.setItem("initialized", true);
                    } else {
                        deferred.resolve();
                    }
                });
            }
            return deferred.promise;
        },
        initializeApp: function() {
            this.set('initialized', true);
            localStorage.setItem('initialized', true);
        }
    };
});