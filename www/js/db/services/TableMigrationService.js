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
        insertValues: function(columns, values) {
            var commaSeparatedColumns = columns.join(',');
            var commaSeparatedValues = values.join(',');

            var query = 'INSERT INTO ' + this.tableName + '('+ commaSeparatedColumns +') SELECT '+ commaSeparatedValues;
            query += ' WHERE NOT EXISTS (SELECT 1 FROM ' + this.tableName + ' WHERE ';

            for (var i = 0; i < columns.length; i++) {
                query += columns[i] + ' = ' + values[i] + ' and ';
            }
            query = query.replace(/and\s$/, '');
            query += ')';
            
            this.transactions.push(query);
            return this;
        }
    };

    return TableMigration;
});
