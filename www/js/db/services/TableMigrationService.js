communicatorApp.service('TableMigrationService', function() {
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
        },
        insertValues: function(columns, valuesArray) {
            var commaSeparatedColumns = columns.join(', ');

            valuesArray.forEach(function(values) {
                var commaSeparatedValues = values.join(', ');

                var query = 'INSERT INTO ' + this.tableName + '(' + commaSeparatedColumns + ') SELECT '+ commaSeparatedValues +
                            ' WHERE NOT EXISTS (SELECT 1 FROM ' + this.tableName + ' WHERE ';

                query += columns.map(function(column, index) {
                    return column + ' = ' + values[index];
                }).join(' and ');

                query += ')';
                
                this.transactions.push(query);
            }, this);
            
            return this;
        }
    };

    return TableMigration;
});
