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
                console.log("Tapearon");



                if(eraser.showDelete || touchedDeleteButton){
                    if(touchedDeleteButton) {   
                        touchedDeleteButton = false;
                    } else {
                        eraser.showConfirmAndHideAddButton = false;
                        eraser.showDelete = false;
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
                eraser.itemDeleteCanceled(model);
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
                for (var i = selectedModelsToDelete.length - 1; i > -1; i--) {
                    eraser.itemDeleteCanceled(selectedModelsToDelete[i]);
                }
            });
            touchedDeleteButton = false;
        },
        itemDeleteCanceled: function(model){
            delete model.selectedToDelete;
            eraser.currentCSSClass(model);
            selectedModelsToDelete.splice(selectedModelsToDelete.indexOf(model), 1);
            if(selectedModelsToDelete.length === 0){
                eraser.showConfirmAndHideAddButton = false;
                this.showDelete = false;
            }
        }
    };
    return eraser;
});