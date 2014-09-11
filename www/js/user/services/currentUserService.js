communicatorApp.service('currentUserService', function(configurationService, uuidService) {
    var userKeys = {
       "user_uuid": "uuid",
       "user_name_key": "name",
       "user_last_name_key": "lastName",
       "user_birthdate_key": "birthdate"
    };

    return {
        get: function() {
            return configurationService.getMultiple(userKeys);
        },
        set: function(user) {
            return configurationService.setMultiple({
                "user_uuid": user.uuid || uuidService.generate(),
                "user_name_key": user.name,
                "user_last_name_key": user.lastName,
                "user_birthdate_key": user.birthdate
            });
        }
    };
});