communicatorApp.service('dbMigrationsService', function(TableMigrationService) {
    return [
        new TableMigrationService('Card')
            .addColumn('title TEXT')
            .addColumn('img TEXT')
            .addColumn('enabled BOOLEAN'),

        new TableMigrationService('Receiver')
            .addColumn('uuid TEXT')
            .addColumn('name TEXT')
            .addColumn('lastName TEXT')
            .addColumn('avatar TEXT')
            .addColumn('pattern TEXT')
            .addColumn('advanced BOOLEAN')
            .addColumn('internal BOOLEAN DEFAULT 0')
            .addColumn('relationshipId INTEGER')
            .addColumn('relationshipName TEXT'),
        
        new TableMigrationService('Level')
            .addColumn('levelNumber INTEGER')
            .addColumn('description TEXT')
            .addColumn('initDate TEXT')
            .addColumn('enabled BOOLEAN'),
            
        new TableMigrationService('Exchange')
            .addColumn('receiverId INTEGER')
            .addColumn('userId INTEGER')
            .addColumn('date TEXT'),

        new TableMigrationService('ExchangeByCard')
            .addColumn('cardId INTEGER')
            .addColumn('exchangeId INTEGER'),

        new TableMigrationService('ScoreByExchange')
            .addColumn('exchangeId INTEGER')
            .addColumn('scoreId INTEGER')
            .addColumn('stepId INTEGER'),

        new TableMigrationService('Step')
            .addColumn('name TEXT')
            .addColumn('level INTEGER'),

        new TableMigrationService('Score')
            .addColumn('name TEXT'),

        new TableMigrationService('Configuration')
            .addColumn('key TEXT')
            .addColumn('value TEXT'),

        new TableMigrationService('Relationship')
            .addColumn('name TEXT')
            .addColumn('advancedByDefault BOOLEAN')
            .addColumn('hasCustomName BOOLEAN')
    ];
});