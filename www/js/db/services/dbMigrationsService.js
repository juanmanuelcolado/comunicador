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
        }
    };

    return {
        migrations: [
            new TableMigration('Card')
                .addColumn('title TEXT'),

            new TableMigration('Receptor')
                .addColumn('name TEXT')
                .addColumn('lastName TEXT')
                .addColumn('pattern TEXT')
                .addColumn('advanced BOOLEAN')

        ],
        eachTransaction: function(fn) {
            this.migrations.forEach(function(migration) {
                migration.transactions.forEach(fn);
            });
        }
    };
});