communicatorApp.service('dbMigrationsService', function() {
    var Migration = function(tableName) {
        this.tableName = tableName;
        this.query = '';
        this.createTable();
    };

    Migration.prototype = {
        createTable: function () {
           this.query += 'CREATE TABLE IF NOT EXISTS ' + this.tableName + ';\n';
           return this;
        },
        addColumn: function (column) {
           this.query += 'ALTER TABLE ' + this.tableName + ' ADD COLUMN ' + column + ';\n';
           return this;
        },
        run: function(operations) {
            operations.call(this);
            return this;
        }
    };

    return {
        migrations: [
            new Migration('Card')
                .addColumn('Id INTEGER PRIMARY KEY ASC')
                .addColumn('Title TEXT')

            // Some other table
        ]
    };
});