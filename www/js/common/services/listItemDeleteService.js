communicatorApp.service('listItemDeleteService', function($rootScope, $timeout, $state) {
    var touchedDeleteButton = false;
    var selectedModelsToDelete = [];

    var eraser = {
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
                        $rootScope.$broadcast('cancelDelete');
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

                $rootScope.$broadcast("selectedToDelete");
            }
        },
        currentCSSClass: function(model) {
            return model.selectedToDelete ? "selected-to-delete" : "normal-item";
        },
        delete: function() {
            selectedModelsToDelete.forEach(function(model){
                $rootScope.$broadcast("delete", model);
            });
            eraser.showDelete = false;
        },
        deleteCanceled: function() {
            selectedModelsToDelete.forEach(function(model) {
                delete model.selectedToDelete;
                eraser.currentCSSClass(model);
            });
            selectedModelsToDelete = [];
            touchedDeleteButton = false;
            this.showDelete = false;
        }
    };

    return eraser;
});