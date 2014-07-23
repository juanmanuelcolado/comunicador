communicatorApp.service('cardDbService', function(dbService) {
    return {
        getCards: function() {
            return dbService.executeTransaction({
                text: 'SELECT * FROM Card'
            });
        },
        getSingleCard: function(id) {
            return dbService.executeTransaction({
                text: 'SELECT * FROM Card WHERE Id = ?',
                args: [id]
            });
        },
        addCard: function(card) {
            return dbService.executeTransaction({
                text: 'INSERT INTO Card(Title) VALUES (?)',
                args: [card.Title]
            });
        },
        editCard: function(card) {
            return dbService.executeTransaction({
                text: 'UPDATE Card SET Title = ? WHERE Id = ?',
                args: [card.Title, card.Id]
            });
        }
    };
});