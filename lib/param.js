const createObjectID = require('campsi/lib/modules/createObjectID');
const helpers = require('campsi/lib/modules/responseHelpers');

module.exports.attachWebHook = function () {
  return (req, res, next) => {
    if (req.params.webhook) {
      req.filter = {_id: createObjectID(req.params.webhook)};
      if (!req.filter._id) {
        return helpers.error(res, {message: 'Can\'t recognize webhook id'});
      }
    }

    next();
  };
};
