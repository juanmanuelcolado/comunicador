communicatorApp.service('imageUploaderService', function() {
    var cameraIsEnabled = !!navigator.camera;

    var webView = {
        hiddenFileInpuId: "-hidden-file-input",
        takePicture: function(success, error) {
            var fileInput = document.getElementById(webView.hiddenFileInpuId) || webView.createHiddenFileInput();
            fileInput.onchange = webView.onFileInputChangeEvent(success);
            fileInput.click();
        },
        onFileInputChangeEvent: function(success) {
            return function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onloadend = function () { success(reader.result); };

                if (file) {
                    reader.readAsDataURL(file);
                }
            };
        },
        createHiddenFileInput: function() {
            var fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = webView.hiddenFileInpuId;
            fileInput.style.visibility = "hidden";
            document.body.appendChild(fileInput);
            return fileInput;
        }
    };

    var device = {
        takePicture: function(success, error) {
            navigator.camera.getPicture(success, error);
        },
        pictureFromDevice: function(success, error) {
            navigator.camera.getPicture(success, error, {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            });
        }
    };

    return {
    	defaultSrc       : 'img/ionic.png',
        cameraIsEnabled  : cameraIsEnabled,
    	takePicture      : cameraIsEnabled ? device.takePicture : webView.takePicture,
        pictureFromDevice: cameraIsEnabled ? device.pictureFromDevice : webView.takePicture
    };
});