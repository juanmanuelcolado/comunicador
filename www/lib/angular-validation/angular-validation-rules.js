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
                inList: function(value,scope) {
                    var equalItems = scope.$parent.$parent.equalItems;
                    var items = scope.$parent.$parent.$parent.items;
                    return items.every(function(element, index, array){return !equalItems(value,element)});
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
                },
                inList: {
                    error: '✖ Ya existe ese nombre',
                    success: '✓'
                }
            });
    }]);
}).call(this);
