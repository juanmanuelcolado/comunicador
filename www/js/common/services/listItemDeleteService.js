communicatorApp.service('listItemDeleteService', function($rootScope, $timeout, $state) {
    var touchedDeleteButton = false;
    var selectedModelsToDelete = [];

    var eraser = {
        showConfirmAndHideAddButton: false,
        showDelete: false,
        showDeleteButton: function() {
            $timeout(function() {
                eraser.showDelete = true;
                touchedDeleteButton = false;
                selectedModelsToDelete = [];
            });
        },
        modelTap: function(id, redirectState) {
            $timeout(function() {
                if(eraser.showDelete){
                    if(touchedDeleteButton) {   
                        touchedDeleteButton = false;
                    } else {
                        eraser.showConfirmAndHideAddButton = false;
                        eraser.deleteCanceled();
                    }
                } else {
                    if (redirectState) {
                        $state.go(redirectState, {id: id});
                    }
                }
            });
        },
        selectToDelete: function(model) {
            touchedDeleteButton = true;
            if(selectedModelsToDelete.indexOf(model) === -1){
                model.selectedToDelete = true;
                selectedModelsToDelete.push(model);
                this.currentCSSClass(model);
                eraser.showConfirmAndHideAddButton = true;
            } else {
                model.selectedToDelete = false;
                //TO DO:
                //Sacarlo de la lista para borrar
                //Verificar que se pueda hacer varias veces.
                //Si la lista quedó vacía, sacar el footer
                this.currentCSSClass(model);
            }

        },
        currentCSSClass: function(model) {
            return model.selectedToDelete ? "selected-to-delete" : "normal-item";
        },
        delete: function() {
            selectedModelsToDelete.forEach(function(model){
                $rootScope.$broadcast("delete", model);
            });
            eraser.showConfirmAndHideAddButton = false;
            eraser.showDelete = false;
        },
        deleteCanceled: function() {
            selectedModelsToDelete.forEach(function(model) {
                delete model.selectedToDelete;
                eraser.currentCSSClass(model);
            });
            selectedModelsToDelete = [];
            touchedDeleteButton = false;
            eraser.showConfirmAndHideAddButton = false;
            this.showDelete = false;
        }
    };

    return eraser;
});