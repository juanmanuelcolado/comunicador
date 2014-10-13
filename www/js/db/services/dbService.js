communicatorApp.service('dbService', function($q, dbMigrationsService, dbSeedsService, appService) {
    var dbService = {};

    var db = window.openDatabase('comunicatorDB', '1.0', 'comunicator database', 2*1024*1024);

    var dbOnSuccess = function(tx, results) { };

    var dbOnError = function(tx, error) {
        console.log('DB ERROR! \nThe following transaction failed: ', error);
        throw(error);
    };

    var dbSetup = {
        migrations: dbMigrationsService,
        seeds: dbSeedsService,
        eachTransaction: function(fn) {
            var runFn = function(dbService) {
                dbService.transactions.forEach(fn);
            };
            this.migrations.forEach(runFn);
            this.seeds.forEach(runFn);
        }
    };

    // Transactions
    dbService.executeTransaction = function(transaction) {
        // start a promise
        var deferred = $q.defer();

        // get all transaction args
        var query = transaction.query || '';
        var isInsertQuery = query.indexOf('INSERT') >= 0;
        var args = transaction.args || [];
        var success = function(tx, results) {
            var dbSet = parseResults(results, isInsertQuery);
            deferred.resolve(dbSet);
            dbOnSuccess(tx, dbSet);
        };
        var error = function(tx, error) {
            deferred.reject(error);
            dbOnError(tx, error);
        };

        // execute transaction
        db.transaction(function(tx) {
            tx.executeSql(query, args, success, error);
        });

        return deferred.promise;
    };

    var parseResults = function(results, isInsertQuery) {
        if (isInsertQuery) {
            return results.insertId;
        }

        var set = [];
        for (var i = 0; i < results.rows.length; i++) {
            var item = {};
            // copy is necessary to avoid readonly objects getting passed around
            angular.copy(results.rows.item(i), item);
            set.push(item);
        }
        return set;
    };

    // Run setup
    if (!appService.schemaExists()) {
        dbSetup.eachTransaction(function(transaction) {
            db.transaction(function(tx) {
                tx.executeSql(transaction);
            }); 
        });
        appService.schemaCreated();
    }

    return dbService;
});