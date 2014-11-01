communicatorApp.service('serverService', function($http, $q, configurationService) {
    return {
        timeout: 20,
        getBaseURL: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (this.baseURL) {
                deferred.resolve(this.baseURL);
            } else {
                promise = configurationService.get("server_base_url"); 
            }
            return promise;
        },
        setBaseURL: function(baseURL) {
            if(baseURL !== undefined) {
                this.baseURL = baseURL.search(/^(https?:\/\/)/) !== -1 ? baseURL : "http://" + baseURL;
                configurationService.set("server_base_url", baseURL);
            }
        },
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
                        if(self.getDataToSyncCount() >= 50) {
                            self.clearSyncData();
                        }
                    });
                }
            });
        },
        sync: function() {
            var self = this;
            var deferred = $q.defer();
            var syncTime = new Date().toString();

            if (navigator.onLine) {
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
            } else {
                setTimeout(this.sync.bind(this), this.timeout);
                this._incrementTimeout();
                deferred.reject();
            }
            return deferred.promise;
        },
        post: function(configuration) {
            var stringifiedData = typeof(configuration.value) === "string" ? configuration.value : JSON.stringify(configuration.value);
            this.getBaseURL().then(function(baseURL) {
                if (!baseURL) {
                    return;
                }

                $.ajax({
                    url: baseURL + "/exchanges" ,
                    method: "POST",
                    data: {
                        data: stringifiedData
                    },
                    success: function() {
                        if (configuration.id) {
                            configurationService.delete(configuration);
                        }
                    }
                });
            });
        },
        setAutoSync: function(value) {
            configurationService.set("autosync_enabled", !!value);
        },
        clearSyncData: function() {
            configurationService.deleteByKey("data_to_sync");
        },
        getDataToSyncCount: function() {
            var count = localStorage.getItem('data_to_sync_count');
            if (count === null) {
                configurationService.find("data_to_sync").then(function(configurations) {
                    localStorage.setItem('data_to_sync_count', configurations.length);
                });
            }
            return count;
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
