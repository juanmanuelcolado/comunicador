communicatorApp.service('currentReceiverService', function() {
	var currentReceiverService = {
		receiver: {}
	};

	// Get current receiver when the app initializes
	// We should get the latest receiver that made an interaction
	currentReceiverService.receiver = {
		id: 1,
		name: 'Jorge',
		lastName: 'Perez',
		advanced: false,
		pattern: "123"
	};

	return currentReceiverService;
});