const debug = require('debug')('campsi:service:webhooks');
const http = require('http');
const url = require('url');

module.exports = class WebHookEntity {
  constructor (service, id, topic, callback) {
    this.enable = false;
    this.service = service;
    this.id = id;
    this.topic = topic;
    this.callback = callback;
    this.init();
  }

  init () {
    this.options = {};
    if (this.callback.url) {
      let parsedUrl = url.parse(this.callback.url);
      this.options.protocol = parsedUrl.protocol;
      this.options.host = parsedUrl.hostname;
      this.options.path = parsedUrl.path;
      this.options.method = this.callback.method || 'GET';
      this.options.port = parsedUrl.port || 80;
      this.service.server.on(this.topic, this.send.bind(this));
    }
  }

  send (message) {
    const req = http.request(this.options);

    req.on('error', (e) => {
      debug(`problem with request: ${e.message}`);
    });
    if (message !== undefined) {
      req.write(JSON.stringify(message));
    }
    req.end();
  }
};
