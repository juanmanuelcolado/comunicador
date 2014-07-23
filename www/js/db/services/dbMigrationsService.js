communicatorApp.service('dbMigrationsService', function() {
	return {
		migrations: [
			{ query: 'CREATE TABLE IF NOT EXISTS Card' },
			{ query: 'ALTER TABLE Card ADD COLUMN Id INTEGER PRIMARY KEY ASC' },
			{ query: 'ALTER TABLE Card ADD COLUMN Title TEXT' }
		]
	};
});