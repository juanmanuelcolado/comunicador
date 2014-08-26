communicatorApp.service('registryService', function($q, exchangeDbService, stepDbService, scoreDbService, scoreByExchangeDbService, exchangeByCardDbService) {
	var registryService = {};

	registryService.pickedCardId = 0;
	
	var steps = [];
	stepDbService.selectAll().then(function(results) {
		steps = results;
	});

	var scores = [];
	scoreDbService.selectAll().then(function(results) {
		scores = results;
	});

	registryService.getLastRegistry = function() {
		var deferred = $q.defer();
		exchangeDbService.getLastExchange().then(function(exchangeResults) {
			if (exchangeResults.length) {
				scoreByExchangeDbService.getLastScoresByExchange(exchangeResults[0].id).then(function(results) {
					deferred.resolve(makeRegistryScores(results));
				});
			} else {
				deferred.resolve({});
			}
		});
		return deferred.promise;
	};

	registryService.saveBasicRegistry = function(basicRegistryInfo) {
		insertNewExchange(basicRegistryInfo).then(function(exchangeId) {
			steps.forEach(function(step) {
				insertNewScore(exchangeId, step.id, basicRegistryInfo[step.name]);
			});
			insertNewExchangeByCard(exchangeId);
		});
	};

	function makeRegistryScores(scores) {
		return scores.reduce(function(memo, score) {
			memo[getStepName(score.stepId)] = getScoreName(score.scoreId);
			return memo;
		}, {});
	}

	function insertNewExchange (registryInfo) {
		return exchangeDbService.insert({
			receiverId: registryInfo.receiver.id,
			userId: 1, // usuario con TEA
			date: (new Date()).toISOString()
		});
	}

	function insertNewScore (exchangeId, stepId, scoreName) {
		scoreByExchangeDbService.insert({
			exchangeId: exchangeId,
			stepId: stepId,
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