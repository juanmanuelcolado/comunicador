communicatorApp.service('registryServerService', function($q, currentUserService, cardDbService, relationshipDbService, serverService){
	var registryServerService = {};

	var promises = [],
	user = {},
	card = {},
	receiver = {},
	relationshipName = '',
	level = 0,
	registry = {};

	registryServerService.sendExchangeToServer = function(registryInfo, levelNumber, cardId) {
		level = levelNumber;
		card.id = cardId;
		registry = registryInfo;
		receiver = registryInfo.receiver;

		getData().then(function(results) {
			user = results[0];
			card = results[1][0];
			relationshipName = results[2];
			delete registry.receiver;
			serverService.send(makeExchangePackage());
		});
	};

	function getData () {
		promises.push(currentUserService.get());
		promises.push(cardDbService.find(card.id));
		promises.push(getRelationshipName());
		return $q.all(promises);
	}

	function getRelationshipName () {
		var deferred = $q.defer();
		if (receiver.relationshipName) {
			deferred.resolve(receiver.relationshipName);
		} else {
			relationshipDbService.find(receiver.relationshipId).then(function(relationship){
				deferred.resolve(relationship.name);
			});
		}
		return deferred.promise;
	}

	function makeExchangePackage () {
		return {
			date: (new Date()).toISOString(),
			user: {
				id: user.uuid,
				name: user.name,
				last_name: user.lastName,
				birthdate: user.birthdate
			},
			card: {
				name: card.title
			},
			receiver: {
				id: receiver.uuid,
				name: receiver.name,
				last_name: receiver.lastName,
				relationship: relationshipName
			},
			level: level,
			registry: registry
		};
	}

	return registryServerService;
});