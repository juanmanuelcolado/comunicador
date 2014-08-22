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

    return {
        migrations: [
            new TableMigration('Card')
                .addColumn('title TEXT')
                .addColumn('img TEXT')
                .addColumn('enabled BOOLEAN'),

            new TableMigration('Receiver')
                .addColumn('name TEXT')
                .addColumn('lastName TEXT')
                .addColumn('avatar TEXT')
                .addColumn('pattern TEXT')
                .addColumn('advanced BOOLEAN'),
            
            new TableMigration('Level')
                .addColumn('levelNumber INTEGER')
                .addColumn('description TEXT')
                .addColumn('initDate DATETIME'),

            new TableMigration('Exchange')
                .addColumn('receiverId INTEGER')
                .addColumn('userId INTEGER')
                .addColumn('date TEXT'),

            new TableMigration('ExchangeByCard')
                .addColumn('cardId INTEGER')
                .addColumn('exchangeId INTEGER'),

            new TableMigration('ScoreByExchange')
                .addColumn('exchangeId INTEGER')
                .addColumn('scoreId INTEGER')
                .addColumn('stepId INTEGER'),

            new TableMigration('Step')
                .addColumn('name TEXT')
                .addColumn('level INTEGER')
                .insertValues(['name','level'],['\'pick\'', 1])
                .insertValues(['name','level'],['\'reach\'', 1])
                .insertValues(['name','level'],['\'drop\'', 1]),

            new TableMigration('Score')
                .addColumn('name TEXT')
                .insertValues(['name'],['\'withHelp\''])
                .insertValues(['name'],['\'withPartialHelp\''])
                .insertValues(['name'],['\'withoutHelp\''])

        ],
        eachTransaction: function(fn) {
            this.migrations.forEach(function(migration) {
                migration.transactions.forEach(fn);
            });
        }
    };
});