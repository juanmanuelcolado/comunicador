communicatorApp.service('dbSeedsService', function(TableMigrationService, uuidService) {
    return [
        // new TableMigrationService('Card'),

        // new TableMigrationService('Receiver'),

        new TableMigrationService('Level')
            .insertValues(['levelNumber', 'description', 'initDate', 'enabled'], [
                [1, "'Cómo comunicarse'", '"25/08/2014"', '"true"'],
            ])
            .insertValues(['levelNumber', 'description', 'enabled'], [
                [2, '"Distancia y persistencia"', '"false"'],
                [3, '"Discriminar imágenes"', '"false"'],
                [4, '"Estructura oración"', '"false"'],
                [5, '"Responder preguntas"', '"false"'],
                [6, '"Comentar"', '"false"']
            ]),
            
        new TableMigrationService('Step')
            .insertValues(['name', 'level'], [
                ['"pick"', 1],
                ['"reach"', 1],
                ['"drop"', 1]
            ]),

        new TableMigrationService('Score')
            .insertValues(['name'], [
                ['"withHelp"'],
                ['"withPartialHelp"'],
                ['"withoutHelp"']
            ]),

        new TableMigrationService('Configuration'),

        new TableMigrationService('Relationship')
            .insertValues(['name', 'advancedByDefault', 'hasCustomName'], [
                ['"Padre"', '"false"', '"false"'],
                ['"Madre"', '"false"', '"false"'],
                ['"Hermano"', '"false"', '"false"'],
                ['"Terapeuta"', '"true"', '"false"'],
                ['"Otro"', '"false"', '"true"']
            ])
    ];
});