communicatorApp.service('dbMigrationsService', function() {
    var TableMigration = function(tableName) {
        this.tableName = tableName;
        this.transactions = [];
        this.createTable();
    };

    TableMigration.prototype = {
        createTable: function () {
            this.transactions.push('CREATE TABLE IF NOT EXISTS ' + this.tableName + '(id INTEGER PRIMARY KEY ASC)');
            return this;
        },
        addColumn: function (column) {
            this.transactions.push('ALTER TABLE ' + this.tableName + ' ADD COLUMN ' + column);
            return this;
        },
        createIndex: function (indexType, column) {
            var indexName = this.tableName + column + indexType;
            this.transactions.push('CREATE ' + indexType + ' INDEX IF NOT EXISTS ' + indexName + ' ON ' + this.tableName + ' (' + column + ')');
            return this;
        }
    };

    return {
        migrations: [
            new TableMigration('Card')
                .addColumn('title TEXT')
                .addColumn('enabled BOOLEAN'),

            new TableMigration('Receiver')
                .addColumn('name TEXT')
                .addColumn('lastName TEXT')
                .addColumn('avatar TEXT')
                .addColumn('pattern TEXT')
                .addColumn('advanced BOOLEAN'),

            new TableMigration('Configuration')
                .addColumn('key TEXT').createIndex('UNIQUE', 'key')
                .addColumn('value TEXT')
        ],
        eachTransaction: function(fn) {
            this.migrations.forEach(function(migration) {
                migration.transactions.forEach(fn);
            });
        }
    };
});