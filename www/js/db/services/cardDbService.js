communicatorApp.service('cardDbService', function(dbService) {
    return {
        getCards: function() {
            return dbService.executeTransaction({
                query: 'SELECT * FROM Card'
            });
        },
        getSingleCard: function(id) {
            return dbService.executeTransaction({
                query: 'SELECT * FROM Card WHERE id = ?',
                args: [id]
            });
        },
        addCard: function(card) {
            return dbService.executeTransaction({
                query: 'INSERT INTO Card(title) VALUES (?)',
                args: [card.title]
            });
        },
        editCard: function(card) {
            return dbService.executeTransaction({
                query: 'UPDATE Card SET title = ? WHERE id = ?',
                args: [card.title, card.id]
            });
        }
    };
});