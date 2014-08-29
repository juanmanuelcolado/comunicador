communicatorApp.service('serverService', function($http, $q, configurationService) {
    return {
        baseURL: "http://localhost:3000",
        timeout: 20,
        send: function(json) {
            var self = this;
            configurationService.get("autosync_enabled").then(function(autoSyncEnabled) {
                if (autoSyncEnabled === "true" && navigator.onLine) {
                    self.post({ value: json });
                } else {
                    configurationService.insert({ key: "data_to_sync", value: JSON.stringify(json) }).then(function() {
                        if (autoSyncEnabled === "true" && !navigator.onLine) {
                            self.sync();
                        }
                    });
                }
            });
        },
        sync: function() {
            var self = this;
            var deferred = $q.defer();
            var syncTime = new Date().toString();

            if (Offline.state === "down") {
                setTimeout(this.sync.bind(this), this.timeout);
                this._incrementTimeout();
                deferred.reject();
            } else {
                this.timeout = 20;
                configurationService.find("data_to_sync").then(function(configurations) {
                    configurations.forEach(function(configuration, index) {
                        setTimeout(function() {
                            self.post(configuration);
                        }, index * 20);
                    });
                });
                configurationService.set("server_last_sync_time", syncTime);
                deferred.resolve(syncTime);
            }
            return deferred.promise;
        },
        post: function(configuration) {
            var stringifiedData = JSON.stringify(configuration.value);
            $.ajax({
                url: this.baseURL + "/interactions" ,
                method: "POST",
                data: stringifiedData,
                success: function() {
                    if (configuration.id) {
                        configurationService.delete(configuration);
                    }
                }
            });
        },
        setAutoSync: function(value) {
            configurationService.set("autosync_enabled", !!value);
        },
        getCurrentConfiguration: function() {
            return configurationService.getMultiple({
                "server_last_sync_time": "lastSyncTime",
                "autosync_enabled": "autoSyncEnabled"
            });
        },
        _incrementTimeout: function() {
            if (this.timeout < 20000) {
                this.timeout = this.timeout * 1.5;
            }
        }
    };
});
