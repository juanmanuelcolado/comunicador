communicatorApp.service('uuidService', function() {
    return {
        generate: function() {
            var now = Date.now();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(repl) {
                var rnd = (now + Math.random()*16)%16 | 0;
                now = Math.floor(now/16);
                return (repl === 'x' ? rnd : (rnd&0x7|0x8)).toString(16);
            });
            return uuid;
        }
    };
});