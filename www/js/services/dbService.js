communicatorApp.service('dbService', function($q) {
	var dbService = {};

	var db = window.openDatabase('comunicatorDB', '1.0', 'comunicator database', 2*1024*1024);

	// Create tables
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Card (Id INTEGER PRIMARY KEY ASC, Title TEXT)');
	});

	var dbOnError = function(tx, error) {
		console.log('DB ERROR! \nThe following transaction failed: ', tx);
		throw(error);
	};

	var dbOnSuccess = function(tx, results) {
		// yay!
	};

	var parseResults = function(results) {
		var set = [];
		for (var i = 0; i < results.rows.length; i++) {
			var item = {};
			// copy is necessary to avoid readonly objects getting passed around
			angular.copy(results.rows.item(i), item);
			set.push(item);
		};
		return set;
	};

	// Transactions
	dbService.executeTransaction = function(query) {
		// start a promise
		var deferred = $q.defer();

		// get all query args
		var text = query.text || '';
		var args = query.args || [];
		var success = function(tx, results) {
			var dbSet = parseResults(results);
			deferred.resolve(dbSet);
			dbOnSuccess(tx, dbSet);
		};
		var error = function(tx, error) {
			deferred.reject(error);
			dbOnError(tx, error);
		};

		// execute transaction
		db.transaction(function(tx) {
			tx.executeSql(text, args, success, error);
		});

		return deferred.promise;
	};

	return dbService;
});