process.env.NODE_CONFIG_DIR = './test/config';
process.env.NODE_ENV = 'test';

const {MongoClient} = require('mongodb');
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
    WebHooks: require('../lib'),
};

describe('Assets API', () => {
    beforeEach((done) => {

        // Empty the database
        MongoClient.connect(config.campsi.mongoURI).then((db) => {
            db.dropDatabase(() => {
                db.close();
                campsi = new CampsiServer(config.campsi);
                campsi.mount('assets', new services.Assets(config.services.webhooks));

                campsi.on('ready', () => {
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
