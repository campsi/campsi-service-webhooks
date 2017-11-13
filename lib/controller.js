const WebHookEntity = require('./entity');

let webHooks = {};

module.exports.launchWebHook = function(service, id, topic, callback) {
    if(!webHooks[id]) {
        webHooks[id] = new WebHookEntity(service, id, topic, callback);
    }
};
