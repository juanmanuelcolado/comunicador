(function() {
    angular.module('validation.rules', ['validation']).config(['$validationProvider', function($validationProvider) {

        $validationProvider
            .setExpression({
                required: function() {
                    return validateExpression(function(value){
                        return !!value;
                    }, arguments);
                },
                requiredSelect: function() {
                    return validateExpression(function(value){
                        return !!value && value !== "?";
                    }, arguments);
                },
                validDate: function() {
                    return validateExpression(validDate, arguments);
                },
                inRange: function(value) {
                    return validateExpression(function(value){
                        return value.length >= 2 && value.length <= 32;
                    }, arguments);
                },
                inList: function() {
                    return validateExpression(function(value, scope){
                        var equalItems = scope.$parent.$parent.equalItems;
                        var items = scope.$parent.$parent.$parent.items;
                        return items.every(function(element, index, array){ return !equalItems(value,element); }) || equalItems(value,scope.$parent.$parent.last);
                    }, arguments);
                },
                photoRequired: function() {
                    return validateExpression(function(value){
                        return value !== '';
                    }, arguments);
                }
            })
            .setDefaultMsg({
                required: {
                    error: 'Campo requerido',
                    success: ''
                },
                requiredSelect: {
                    error: 'Campo requerido',
                    success: ''
                },
                validDate: {
                    error: 'Fecha inválida',
                    success: ''
                },
                inRange: {
                    error: 'Debe tener entre 2 y 32 caracteres',
                    success: ''
                },
                number: {
                    error: 'Debe ser un Número',
                    success: ''
                },
                inList: {
                    error: 'Debe ser distinto a otros nombres',
                    success: ''
                },
                photoRequired: {
                    error: 'Debe seleccionar una imagen',
                    success: ''
                }
            })
            .setErrorHTML(function(msg) {
                return '<p class="validation-invalid"><i class="icon ion-close-circled"></i>  '+ msg +'</p class="validation-invalid">';
            });

        function validateExpression (expression, args) {
            var element = args[2];
            var result = expression.apply(expression, args);
            element.parent().toggleClass('invalid-item', !result);
            return result;
        }

        // To be extracted
        function validDate(text) {
            var date = Date.parse(text);
            var splitted, m, d, y;

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
                    date.getDate() === d &&
                    y > 1950);
        }
    }]);
}).call(this);
