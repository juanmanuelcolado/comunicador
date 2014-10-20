communicatorApp.service('registryService', function($q, exchangeDbService, stepDbService, scoreDbService, scoreByExchangeDbService, exchangeByCardDbService, registryServerService, levelDbService) {
	var registryService = {};

	registryService.pickedCardId = 0;

	registryService.pickedLevelNumber = 0;
	
	var steps = [];
	stepDbService.selectAll().then(function(results) {
		steps = results;
	});

	var scores = [];
	scoreDbService.selectAll().then(function(results) {
		scores = results;
	});

	var levels = [];
	levelDbService.selectAll().then(function(results){
		levels = results;
	});

	registryService.saveRegistry = function(registryInfo) {
		insertNewExchange(registryInfo).then(function(exchangeId) {
			steps.forEach(function(step) {
				insertNewScore(exchangeId, step.id, registryInfo[step.name]);
			});
			insertNewExchangeByCard(exchangeId);
			setLevelInitDate(registryService.pickedLevelNumber);
			registryServerService.sendExchangeToServer(registryInfo, registryService.pickedLevelNumber, registryService.pickedCardId);
		});
	};

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

	function setLevelInitDate (levelNumber) {
		var initDate = getLevelDate(levelNumber);
		if (initDate === null)
		{
			var date = new Date();
			var today =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear().toString().substr(2,2);
			levelDbService.update({
				id: getLevelId(levelNumber),
				levelNumber: levelNumber,
				description: getLevelDescription(levelNumber),
				initDate: today,
				enabled: getLevelEnabled(levelNumber)
			});
		}
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

	function getLevelDate(levelNumber){
		return levels.filter(function(level) {
			return level.levelNumber === levelNumber;
		})[0].initDate;
	}

	function getLevelId (levelNumber){
		return levels.filter(function(level) {
			return level.levelNumber === levelNumber;
		})[0].id;
	}

	function getLevelDescription (levelNumber){
		return levels.filter(function(level) {
			return level.levelNumber === levelNumber;
		})[0].description;
	}

	function getLevelEnabled(levelNumber) {
		return levels.filter(function(level) {
			return level.levelNumber === levelNumber;
		})[0].enabled;
	}

	return registryService;
});