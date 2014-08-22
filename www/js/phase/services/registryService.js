communicatorApp.service('registryService', function(exchangeDbService, stepDbService, scoreDbService, scoreByExchangeDbService, exchangeByCardDbService) {
	var registryService = {};

	var steps = [];
	stepDbService.selectAll().then(function(results) {
		steps = results;
	});

	var scores = [];
	scoreDbService.selectAll().then(function(results) {
		scores = results;
	});
	
	registryService.pickedCardId = 0;

	registryService.saveBasicRegistry = function(basicRegistryInfo) {
		insertNewExchange(basicRegistryInfo).then(function(insertId) {
			var exchangeId = insertId;
			insertNewScore(exchangeId, 'pick', basicRegistryInfo.pick);
			insertNewScore(exchangeId, 'reach', basicRegistryInfo.reach);
			insertNewScore(exchangeId, 'drop', basicRegistryInfo.drop);
			insertNewExchangeByCard(exchangeId);
		});
	};

	function insertNewExchange (registryInfo) {
		return exchangeDbService.insert({
			receiverId: registryInfo.receiverId,
			userId: 1, // usuario con TEA
			date: (new Date()).toISOString()
		});
	}

	function insertNewScore (exchangeId, stepName, scoreName) {
		scoreByExchangeDbService.insert({
			exchangeId: exchangeId,
			stepId: getStepId(stepName),
			scoreId: getScoreId(scoreName)
		});		
	}

	function insertNewExchangeByCard (exchangeId) {
		exchangeByCardDbService.insert({
			exchangeId: exchangeId,
			cardId: registryService.pickedCardId
		});
	}

	function getStepId (stepName) {
		return steps.filter(function(step) { 
			return step.name === stepName; 
		})[0].id;
	}

	function getScoreId (scoreName) {
		return scores.filter(function(score) { 
			return score.name === scoreName; 
		})[0].id;
	}

	return registryService;
});