communicatorApp.service('configurationService', function(configurationDbService, $q) {
    var db = configurationDbService;
    var addToPartialResult = function(keyName) {
        var returnValue = {};
        return function(result) {
            returnValue[keyName] = result;
            return returnValue;
        };
    };

    return {
        get: function(key) {
            var deferred = $q.defer();
            db.find(key).then(function(results) {
                var configuration = results.length > 0 ? results[0] : { value: undefined };
                deferred.resolve(configuration.value);
            });
            return deferred.promise;
        },
        getMultiple: function(keys) {
            var deferred = $q.defer();
            var promises = [];

            for(var keyName in keys) {
                promises.push(
                    this.get(keyName).then(addToPartialResult(keys[keyName]))
                );
            }

            $q.all(promises).then(function(results) {
                var mergedResult = results.reduce(function(memo, current) {
                    return angular.extend(memo, current);
                }, {});
                deferred.resolve(mergedResult);
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
        setMultiple: function(configurations) {
            var deferred = $q.defer();
            var promises = [];           

            for(var key in configurations) {
                promises.push(
                    this.set(key, configurations[key])
                );
            }
 
            $q.all(promises).then(function(results) {
                deferred.resolve(results);
            });
            return deferred.promise;
        }
    };
});