communicatorApp.service('registryService', function($q, exchangeDbService, stepDbService, scoreDbService, scoreByExchangeDbService, exchangeByCardDbService) {
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

	registryService.getLastRegistry = function() {
		var deferred = $q.defer();
		var exchangeScores = {};
		exchangeDbService.getLastExchange().then(function(exchangeResults) {
			if (exchangeResults.length) {
				var lastExchange = exchangeResults[0];
				scoreByExchangeDbService.getLastScoresByExchange(lastExchange.id).then(function(results) {
					for (var i = 0; i < results.length; i++) {
						exchangeScores[getStepName(results[i].stepId)] = getScoreName(results[i].scoreId);
					}
					deferred.resolve(exchangeScores);
				});
			} else {
				deferred.resolve(exchangeScores);
			}
		});
		return deferred.promise;
	};

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
			receiverId: registryInfo.receiver.id,
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

	function getStepName (stepId) {
		return steps.filter(function(step) { 
			return step.id === stepId; 
		})[0].name;
	}

	function getScoreId (scoreName) {
		return scores.filter(function(score) { 
			return score.name === scoreName; 
		})[0].id;
	}
	
	function getScoreName (scoreId) {
		return scores.filter(function(score) { 
			return score.id === scoreId; 
		})[0].name;
	}

	return registryService;
});