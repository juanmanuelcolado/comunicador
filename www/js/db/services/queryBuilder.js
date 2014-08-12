communicatorApp.service('QueryBuilder', function(dbService) {
    var QueryModel = function(model) {
        if (!model) {
            throw 'A model should be provided to the QueryBuilder instance';
        }
        this.model = model;
        this._columnNames = this._constructColumnNames();
    };

    QueryModel.prototype = {
        valueSlots: function(separator) {
            var slots = this._columnNames.map(function() {
                return "?";
            });
            return slots.join(separator || ', '); 
        }, 
        args: function(options) {
            var args = this._columnNames.map(function(property) {
                return this[property];
            }, this.model); 

            if (options && options.id) {
                args.push(this.model.id);
            }
            return args;
        },
        coulmnNames: function(separator) {
            return this._columnNames.join(separator || ', ');
        },
        _constructColumnNames: function() {
            // Avoid the id, if it exists
            var columnNames = Object.keys(this.model);
            var index = columnNames.indexOf('id');
            if (index !== -1) {
                columnNames.splice(index, 1);
            }
            return columnNames;
        }
    };

    var QueryBuilder = function(tableName) {
        if (!tableName) {
            throw 'A tableName should be provided to the QueryBuilder instance';
        }
        this.tableName = tableName;
    };
    QueryBuilder.prototype = {
        selectAll: function() {
            return this.execute({
                query: 'SELECT * FROM ' + this.tableName
            });
        },
        find: function(id) {
            return this.execute({
                query: 'SELECT * FROM ' + this.tableName + ' WHERE id = ?',
                args: [id]
            });
        },
        delete: function(user) {
            return this.execute({
                query: 'DELETE * FROM ' + this.tableName + ' WHERE id = ?',
                args: [user.id]
            });
        },
        insert: function(model) {
            var queryModel = new QueryModel(model);
            return this.execute({
                query: 'INSERT INTO ' + this.tableName + '(' + queryModel.coulmnNames() + ') VALUES (' + queryModel.valueSlots() + ')',
                args: queryModel.args()
            });
        },
        update: function(model) {
            var queryModel = new QueryModel(model);
            return this.execute({
                query: 'UPDATE ' + this.tableName + ' SET ' + queryModel.coulmnNames(' = ?, ') + ' = ? WHERE id = ?',
                args: queryModel.args({ id: true })
            });
        },
        define: function(query, args) {
            return this.execute({
                query: query,
                args: args || []
            });
        },
        execute: function(transaction) {
            return dbService.executeTransaction(transaction);
        }
    };

    return QueryBuilder;
});