communicatorApp.controller('patternLockCtrl', function($scope) {
	
	var lock = new PatternLock("#lock", { 
		margin: getMarginSize(),
		onDraw: validatePattern
	});

	function validatePattern (pattern) {
		lock.error();
	}

	function getMarginSize () {
		var containerSize = window.screen.width - 60;
		var columnSize = containerSize/3;
		var extraSpace = columnSize - 50;
		var marginSize = extraSpace / 2;
		return marginSize;
	}
});