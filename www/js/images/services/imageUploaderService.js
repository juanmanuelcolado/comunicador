communicatorApp.service('imageUploaderService', function() {
    var cameraIsEnabled = !!navigator.camera;
    var dataToBase64 = function(file, callback) {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    };

    var webView = {
        hiddenFileInpuId: "-hidden-file-input",
        takePicture: function(success, error) {
            var fileInput = document.getElementById(webView.hiddenFileInpuId) || webView.createHiddenFileInput();
            fileInput.onchange = webView.onFileInputChangeEvent(success);
            fileInput.click();
        },
        onFileInputChangeEvent: function(callback) {
            return function() {
                var file = this.files[0];
                if (file) {
                    dataToBase64(file, callback);
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
            device._getPicture("FILE_URI", "CAMERA", success, error);
        },
        pictureFromDevice: function(success, error) {
            device._getPicture("DATA_URL", "PHOTOLIBRARY", function(file) {
                success("data:image/jpeg;base64," + file);
            }, error);
        },
        _getPicture: function(destinationType, sourceType, success, error) {
            navigator.camera.getPicture(success, error, {
                destinationType: Camera.DestinationType[destinationType],
                sourceType: Camera.PictureSourceType[sourceType],
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true,
                saveToPhotoAlbum: true
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