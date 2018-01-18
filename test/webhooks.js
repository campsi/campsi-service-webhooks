process.env.NODE_CONFIG_DIR = './test/config';
process.env.NODE_ENV = 'test';

const { MongoClient } = require('mongodb');
const mongoUriBuilder = require('mongo-uri-builder');
const debug = require('debug')('campsi:test');
const chai = require('chai');
const chaiHttp = require('chai-http');
const CampsiServer = require('campsi');
const config = require('config');

let campsi;
let server;

chai.use(chaiHttp);
chai.should();

const services = {
    Trace: require('campsi-service-trace'),
    WebHooks: require('../lib'),
};

describe('Assets API', () => {
    beforeEach((done) => {
        const mongoUri = mongoUriBuilder(config.campsi.mongo);
        MongoClient.connect(mongoUri, (err, client) => {
            let db = client.db(config.campsi.mongo.database);
            db.dropDatabase(() => {
                client.close();
                campsi = new CampsiServer(config.campsi);
                campsi.mount('trace', new services.Trace(config.services.trace));
                campsi.mount('webhooks', new services.WebHooks(config.services.webHooks));

                campsi.on('campsi/ready', () => {
                    server = campsi.listen(config.port);
                    done();
                });

                campsi.start()
                    .catch((err) => {
                        debug('Error: %s', err);
                    });
            });
        });
    });

    afterEach((done) => {
        server.close();
        done();
    });
    /*
     * Test a simple webhook
     */
    describe('Basic webhook', () => {
        it('it should call a trace event when emiting a hooked event.', (done) => {
            campsi.on('trace/request', (payload) => {
                payload.should.be.a('object');
                payload.method.should.be.eq('GET');
                done();
            });
            campsi.emit('webhooks/test/topic');
        });
    });
    /*
     * Test the /GET / route
     */
    /*describe('/GET /', () => {
        it('it should return a list of assets', (done) => {
            createWebhooks(Array(5).fill('./test/rsrc/logo_agilitation.png'))
                .then(() => {
                    chai.request(campsi.app)
                        .get('/webhooks/')
                        .query({page: 3, perPage: 2})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.should.have.header('x-total-count', '5');
                            res.should.have.header('link');
                            res.should.be.json;
                            res.body.should.be.an('array');
                            res.body.length.should.be.eq(1);
                            done();
                        });
                });

        });
    });*/
});
