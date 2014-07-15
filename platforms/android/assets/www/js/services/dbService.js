communicatorApp.service('dbService', function($q) {
	var dbService = {};

	var db = window.openDatabase('comunicatorDB', '1.0', 'comunicator database', 2*1024*1024);

	var dbOnError = function(tx, error) {
		console.log('DB ERROR! \nThe following transaction failed: ', tx);
		throw(error);
	};

	var dbOnSuccess = function(tx, results) {
		// yay!
	};

	// Create tables
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS Card (Id INTEGER PRIMARY KEY ASC, Title TEXT)');
	});

	// Transactions
	var parseResults = function(results) {
		var set = [];
		for (var i = 0; i < results.rows.length; i++) {
			var item = {};
			angular.copy(results.rows.item(i), item);
			set.push(item);
		};
		return set;
	};

	dbService.executeTransaction = function(query) {
		var deferred = $q.defer();

		var text = query.text || '';
		var args = query.args || [];
		var success = function(tx, results) {
			var dbSet = parseResults(results);
			deferred.resolve(dbSet);
			dbOnSuccess(tx, dbSet);
		};
		var error = function(tx, error) {
			deferred.reject(error);
			dbOnSuccess(tx, error);
		};

		db.transaction(function(tx) {
			tx.executeSql(text, args, success, error);
		});

		return deferred.promise;
	};

	dbService.getCards = function() {
		return dbService.executeTransaction({
			text: 'SELECT * FROM Card'
		});
	};

	dbService.getSingleCard = function(id) {
		return dbService.executeTransaction({
			text: 'SELECT * FROM Card WHERE Id = ?',
			args: [id]
		});
	};

	dbService.addCard = function(card) {
		return dbService.executeTransaction({
			text: 'INSERT INTO Card(Title) VALUES (?)',
			args: [card.Title]
		});
	};

	dbService.editCard = function(card) {
		return dbService.executeTransaction({
			text: 'UPDATE Card SET Title = ? WHERE Id = ?',
			args: [card.Title, card.Id]
		});
	};

	return dbService;
});