communicatorApp.service('currentReceptorService', function() {
	var currentReceptorService = {
		receptor: {}
	};

	// Get current receptor when the app initializes
	// We should get the latest receptor that made an interaction
	currentReceptorService.receptor = {
		name: 'Jorge',
		lastName: 'Perez',
		advanced: false,
		pattern: "123"
	};

	return currentReceptorService;
})