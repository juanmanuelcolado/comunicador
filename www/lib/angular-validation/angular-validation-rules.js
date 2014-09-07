(function() {
    angular.module('validation.rules', ['validation']).config(['$validationProvider', function($validationProvider) {
        $validationProvider
            .setExpression({
                required: function(value) {
                    return !!value;
                },
                inRange: function(value) {
                    return value.length >= 2 && value.length <= 50;
                },
                number: /^\d+$/
            })
            .setDefaultMsg({
                required: {
                    error: '✖ Campo requerido',
                    success: '✓'
                },
                inRange: {
                    error: '✖ Debe tener entre 2 y 50 caracteres',
                    success: '✓'
                },
                number: {
                    error: '✖ Debe ser un Número',
                    success: '✓'
                }
            });
    }]);
}).call(this);
