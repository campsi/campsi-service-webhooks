const CampsiService = require('campsi/lib/service');
const handlers = require('./handlers');
const param = require('./param');
const format = require('string-format');
const forIn = require('for-in');
const webHookController = require('./controller');

format.extend(String.prototype);

module.exports = class WebhooksService extends CampsiService {

    initialize() {
        this.install();

        this.collection = this.db.collection('webhooks.{0}'.format(this.path));
        this.router.use((req, res, next) => {
            req.service = this;
            next();
        });
        this.router.param('webhook', param.attachWebHook);
        this.router.get('/', handlers.getWebHooks);
        this.router.post('/', handlers.postWebHook);
        this.router.put('/:webhook', handlers.putWebHook);
        this.router.get('/:webhook', handlers.getWebHook);
        this.router.delete('/:webhook', handlers.deleteWebHook);
        return super.initialize();
    }

    install() {
        forIn(this.options.hooks, (hook, id) => {
            webHookController.launchWebHook(this, id, hook.topic, hook.callback);
        });
        /** TODO v2
         * delete database if asked by config
         * update database based on config
         * lauch every hooks based on db !
         **/
    }
};
