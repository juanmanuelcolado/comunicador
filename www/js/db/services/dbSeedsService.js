communicatorApp.service('dbSeedsService', function(TableMigrationService, uuidService) {
    return [
        new TableMigrationService('Card')
            .insertValues(['title', 'enabled', 'img'], [
                ["'Caramelo'",  '"true"', "'img/candy.png'"],
                ["'Pelota'",    '"true"', "'img/ball.png'"],
                ["'Oso'",       '"true"', "'img/bear.png'"],
                ["'Spaghetti'", '"true"', "'img/spaghetti.png'"]
            ]),

        new TableMigrationService('Receiver')
            .insertValues(['uuid', 'name', 'lastName', 'pattern', 'internal'], [
                ["'" + uuidService.generate() + "'", "'Usuario de'", "'prueba'", "'123'", 1]
            ]),

        new TableMigrationService('Level')
            .insertValues(['levelNumber', 'title', 'description', 'enabled'], [
            	[1, "'Cómo comunicarse'", "'Al ver un objeto muy preferido el alumno recogerá el celular con una imagen del objeto, alcanzará al receptor comunicativo y dejará el dispositivo con la imagen en la mano de este.'" , '"true"'],
                [2, '"Distancia y persistencia"', "''", '"false"'],
                [3, '"Discriminar imágenes"', "''", '"false"'],
                [4, '"Estructura oración"', "''", '"false"'],
                [5, '"Responder preguntas"', "''", '"false"'],
                [6, '"Comentar"', "''", '"false"']
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