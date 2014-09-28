(function() {
    angular.module('validation.rules', ['validation']).config(['$validationProvider', function($validationProvider) {
        $validationProvider
            .setExpression({
                required: function(value) {
                    return !!value;
                },
                requiredSelect: function(value) {
                    return !!value && value !== "?";
                },
                validDate: function(value) {
                    return validDate(value);
                },
                inRange: function(value) {
                    return value.length >= 2 && value.length <= 32;
                },
                inList: function(value,scope) {
                    var equalItems = scope.$parent.$parent.equalItems;
                    var items = scope.$parent.$parent.$parent.items;
                    return items.every(function(element, index, array){ return !equalItems(value,element); }) || equalItems(value,scope.$parent.$parent.last);
                },
                photoRequired: function(value,scope) {
                    return value !== '' && value !== scope.$parent.$parent.defaultImg;
                },
                number: /^\d+$/
            })
            .setDefaultMsg({
                required: {
                    error: '✖ Campo requerido',
                    success: '✓'
                },
                requiredSelect: {
                    error: '✖',
                    success: '✓'
                },
                validDate: {
                    error: '✖ Fecha inválida',
                    success: '✓'
                },
                inRange: {
                    error: '✖ Debe tener entre 2 y 32 caracteres',
                    success: '✓'
                },
                number: {
                    error: '✖ Debe ser un Número',
                    success: '✓'
                },
                inList: {
                    error: '✖ Debe ser distinto a otros nombres',
                    success: '✓'
                },
                photoRequired: {
                    error: '✖ Debe seleccionar una imagen',
                    success: '✓'
                }
            });

        // To be extracted
        function validDate(text) {
            var date = Date.parse(text);
            var splitted, m, d, y;

            if (isNaN(date)) {
                return false;
            }

            splitted = text.search('/') > -1 ? text.split('/') : text.split('-');

            if (splitted.length !== 3) {
                return false;
            }

            d = parseInt(splitted[0], 10);
            m = parseInt(splitted[1], 10);
            y = parseInt(splitted[2], 10);
            date = new Date(y, m - 1, d);

            return (date.getFullYear() === y &&
                    date.getMonth() + 1 === m &&
                    date.getDate() === d);
        }
    }]);
}).call(this);
