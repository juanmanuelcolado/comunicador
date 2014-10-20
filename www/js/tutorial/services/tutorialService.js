communicatorApp.service('tutorialService', function($state, $ionicPopup, $timeout) {
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
        closeHTML: '&nbsp;<span class="closeTutorial">X</span>',
        showIfActive: function() {
            switch($state.current.name) {
                case 'tutorialHome':
                    this.step('Iniciar nivel', 'Este tutorial te llevará a través de las funciones básicas de la aplicación.<br/><br/>Para comenzar una actividad se debe presionar IR.', {
                        back: { state: "app.home" },
                        next: { state: "tutorialLevelCards", params: { levelNumber: 1 } }
                    });
                    closeEvent.attach();
                    break;
                case 'tutorialLevelCards':
                    this.step('Seleccionar pictograma', 'Al comenzar un intercambio se debe seleccionar un pictograma de la lista.<br/>En esta sección solo se mostrarán los pictogramas habilitados.', {
                        back: { state: "tutorialHome" },
                        next: { state: "tutorialLevelSingleCard", params: { id: 1 } }
                    });
                    break;
                case 'tutorialLevelSingleCard':
                    this.step('Intercambio', 'Se muestra el pictograma para que pueda ser visto claramente y entregado al receptor por el usuario.<br /><br />Para puntuar el intercambio, puede presionarce el botón de menú o mantener presionado sobre la imagen.', {
                        back: { state: "tutorialLevelCards", params: { levelNumber: 1 } },
                        next: { state: "tutorialPatternLock" }
                    });
                    break;
                case 'tutorialPatternLock':
                    this.step('Desbloqueo', 'Al querer registrar un intercambio, se debe ingresar un patrón de seguridad.<br /><br />Este patrón previene que la interacción del usuario con el dispositivo registre accidentalmente interacciones y es configurado al agregar un nuevo receptor.', {
                        back: { state: "tutorialLevelSingleCard", params: { id: 1 } },
                        next: { state: "tutorialBasicRegistry" }
                    });
                    break;
                case 'tutorialBasicRegistry':
                    this.step('Registrar intercambio', 'Al registrar un intercambio se deben seleccionar los comportamientos que ocurrieron durante el mismo.', {
                        back: { state: "tutorialPatternLock" },
                        next: function() {
                            $state.transitionTo("app.home").then(function() {
                                var lastPopup = $ionicPopup.alert({
                                    title: 'Fin!',
                                    template: 'Eso es todo, ya puedes realizar intercambios! <br />Para ver el tutorial nuevamente, puedes iniciarlo desde Menú -> Configuración.'
                                });
                                $timeout(function() {
                                    lastPopup.close(); 
                                }, 5000);

                                closeEvent.remove();
                            });
                        }
                    });
                    break;
            }
        },
        step: function(title, description, transition) {
            var callback = function(option) {
                return function() {
                    if (typeof(option) === 'function') {
                        option();
                    } else {
                        $state.transitionTo(option.state, option.params);
                    }
                };
            };
            popup = $ionicPopup.confirm({
                title: title + this.closeHTML,
                template: description,
                buttons: [{
                    text: 'Volver',
                    onTap: callback(transition.back)
                }, {
                    text: 'Seguir',
                    type: 'button-positive',
                    onTap: callback(transition.next)
                }]
            });
        }
    };
});