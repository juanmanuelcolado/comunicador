communicatorApp.service('dbSeedsService', function(TableMigrationService) {
    return [
        // new TableMigrationService('Card'),

        // new TableMigrationService('Receiver'),
        
        new TableMigrationService('Level')
            .insertValues(['levelNumber', 'description', 'initDate', 'enabled'], [1, "'Cómo comunicarse'", '"25/08/2014"', '"true"'])
            .insertValues(['levelNumber', 'description', 'enabled'], [2, '"Distancia y persistencia"', '"false"'])
            .insertValues(['levelNumber', 'description', 'enabled'], [3, '"Discriminar imágenes"', '"false"'])
            .insertValues(['levelNumber', 'description', 'enabled'], [4, '"Estructura oración"', '"false"'])
            .insertValues(['levelNumber', 'description', 'enabled'], [5, '"Responder preguntas"', '"false"'])
            .insertValues(['levelNumber', 'description', 'enabled'], [6, '"Comentar"', '"false"']),
            
        new TableMigrationService('Step')
            .insertValues(['name', 'level'], ['"pick"', 1])
            .insertValues(['name', 'level'], ['"reach"', 1])
            .insertValues(['name', 'level'], ['"drop"', 1]),

        new TableMigrationService('Score')
            .insertValues(['name'], ['"withHelp"'])
            .insertValues(['name'], ['"withPartialHelp"'])
            .insertValues(['name'], ['"withoutHelp"']),

        new TableMigrationService('Relationship')
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], ['"Padre"', '"false"', '"false"'])
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], ['"Madre"', '"false"', '"false"'])
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], ['"Hermano"', '"false"', '"false"'])
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], ['"Terapeuta"', '"true"', '"false"'])
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], ['"Otro"', '"false"', '"true"'])
    ];
});