const serviceWebHook = require('./service');
const helpers = require('campsi/lib/modules/responseHelpers');

module.exports.getWebHooks = function(req, res) {

    serviceWebHook.getWebHooks(req.service, req.user)
        .then((data) => helpers.json(res, data))
        .catch(() => helpers.error(res));
};

module.exports.postWebHook = function(req, res) {

    serviceWebHook.createWebHook(req.service, req.user)
        .then((data) => helpers.json(res, data))
        .catch(() => helpers.error(res));
};

module.exports.putWebHook = function(req, res) {

    serviceWebHook.updateWebHook(req.service, req.user)
        .then((data) => helpers.json(res, data))
        .catch(() => helpers.error(res));
};

module.exports.getWebHook = function(req, res) {

    serviceWebHook.getWebHook(req.service, req.user)
        .then((data) => helpers.json(res, data))
        .catch(() => helpers.error(res));
};

module.exports.deleteWebHook = function(req, res) {

    serviceWebHook.deleteWebHook(req.service, req.user)
        .then((data) => helpers.json(res, data))
        .catch(() => helpers.error(res));
};
