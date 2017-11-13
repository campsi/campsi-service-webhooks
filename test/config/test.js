const host = 'http://localhost:3000';

module.exports = {
    port: 3000,
    host: host,
    title: 'Test Assets',
    campsi: {
        mongoURI: 'mongodb://localhost:27017/relationships',
    },
    services: {
        trace: {
            title: 'trace',
        },
        webHooks: {
            title: 'WebHooks',
            namespace: 'hooks-ns',
            options: {
                preserveHooks: false,
                hooks: {
                    wh1: {
                        topic: 'webhooks/test/topic',
                        callback: {
                            url: 'http://localhost:3000/trace/my-wh1'
                        }
                    },
                    wh2: {
                        topic: 'webhooks/test/topic/other',
                        callback: {
                            method: 'POST',
                            url: 'http://localhost:3000/trace/my-wh2?foo=bar',
                            headers: {
                                'x-foo': 'bar'
                            }
                        }
                    }
                }
            }
        }
    }
};
