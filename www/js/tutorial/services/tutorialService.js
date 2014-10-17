communicatorApp.service('tutorialService', function($state, $ionicPopup) {
    var popup;
    var closeEvent = {
        attach: function() {
            closeEvent.remove();
            document.addEventListener('click', closeEvent.event, false);
        },
        event: function(event) {
            if (event.target.classList.contains('closeTutorial')) {
                closeEvent.remove();
                popup.close();
                $state.transitionTo("app.home");
            }
        },
        remove: function() {
            document.removeEventListener('click', closeEvent.event);
        }
    };

    return {
        closeHTML: '&nbsp;<span class="closeTutorial">close</span>',
        showIfActive: function() {
            if ($state.is('tutorialHome')) {
                this.step('Iniciar nivel.', 'Este tutorial te llevará a través de las funciones básicas de la aplicación.<br/>Puedes iniciarlo desde menú -> configuración.<br/><br/>Para comenzar una actividad se debe presionar IR', {
                    back: function() {
                        $state.transitionTo("app.home");
                    },
                    next: function() {
                        $state.transitionTo("tutorialLevelCards", { levelNumber: 1 });
                    }
                });
                closeEvent.attach();
            }
            if ($state.is('tutorialLevelCards')) {
                this.step('Seleccionar pictograma', 'Al comenzar un intercambio se debe seleccionar un pictograma de la lista.<br/>En esta sección solo se mostraran los pictogramas habilitados', {
                    back: function() {
                        $state.transitionTo("tutorialHome");
                    },
                    next: function() { }
                });
            }
        },
        step: function(title, description, callbackTransitions) {
            popup = $ionicPopup.confirm({
                title: title + this.closeHTML,
                template: description,
                buttons: [{
                    text: 'Volver',
                    onTap: callbackTransitions.back
                }, {
                    text: 'Seguir',
                    type: 'button-positive',
                    onTap: callbackTransitions.next
                }]
            });
        }
    };
});