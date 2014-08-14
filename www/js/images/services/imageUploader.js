communicatorApp.service('imageUploader', function() {
	var hiddenFileInpuId = "-hidden-file-input";

	var createHiddenFileInput = function() {
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
		fileInput.id = hiddenFileInpuId;
		fileInput.style.visibility = "hidden";
	    document.body.appendChild(fileInput);

		return fileInput;
	};

    return {
    	defaultSrc: 'img/ionic.png',
    	takePicture: function(success, error) {
	        if(navigator.camera) {
	            navigator.camera.getPicture(success, error);
	        } else {
	        	var fileInput = document.getElementById(hiddenFileInpuId) || createHiddenFileInput();

	            fileInput.onchange = function() {
	                var file = fileInput.files[0];
	                var reader = new FileReader();
	                reader.onloadend = function () {
	                    var encodedData = reader.result;
	                    success(encodedData);
	                };
	                if (file) {
	                    reader.readAsDataURL(file);
	                }
	            };

	            fileInput.click();
	        }
    	}
    };
});