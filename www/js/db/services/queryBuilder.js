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
        all: function() {
            return this.exec({
                query: 'SELECT * FROM ' + this.tableName
            });
        },
        getById: function(id) {
            return this.exec({
                query: 'SELECT * FROM ' + this.tableName + ' WHERE id = ?',
                args: [id]
            });
        },
        delete: function(user) {
            return this.exec({
                query: 'DELETE * FROM ' + this.tableName + ' WHERE id = ?',
                args: [user.id]
            });
        },
        insert: function(model) {
            var queryModel = new QueryModel(model);
            return this.exec({
                query: 'INSERT INTO ' + this.tableName + '(' + queryModel.coulmnNames() + ') VALUES (' + queryModel.valueSlots() + ')',
                args: queryModel.args()
            });
        },
        update: function(model) {
            var queryModel = new QueryModel(model);
            return this.exec({
                query: 'UPDATE ' + this.tableName + ' SET ' + queryModel.coulmnNames(' = ?, ') + ' = ? WHERE id = ?',
                args: queryModel.args({ id: true })
            });
        },
        exec: function(transaction) {
            return dbService.executeTransaction(transaction);
        },
        default: function(fn) {
            var self = this;
            var methods = {
                get: function() {
                    return self.all();
                },
                getSingle: function(id) {
                    return self.getById(id);
                },
                add: function(model) {
                    return self.insert(model);
                },
                edit: function(model) {
                    return self.update(model);
                },
                delete: function(model) {
                    return self.delete(model);
                }
            };
            if (fn) {
                methods = fn.call(this, methods, this) || methods;
            }
            return methods;
        }
    };

    return QueryBuilder;
});