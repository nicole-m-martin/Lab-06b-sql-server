require('dotenv').config();

const { execSync } = require('child_process');
const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');
const { wildAnimals } = require('../data/wildAnimals');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await request(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    // return wild animal array TEST
    test('should respond with the whole animal array', 
      async() => {
        const expectation = 
          wildAnimals;

        const response = await request(app)
          .get('/wildAnimals')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toEqual(expectation);
        
      });

    // return one animal from animal array test
    test('should respond with one animal from array', 
      async() => {
        const expectation = {
         
          'id': 22,
          'animal_common_name': 'Wallaby, euro',
          'animal_science_name': 'Macropus robustus',
          'color': 'Aquamarine',
          'amount': 63,
          'is_fun': true,
          'owner_id': 1
          
        };

        const response = await request(app)
          .get('/wildAnimals/22')
          .expect('Content-Type', /json/)
          .expect(200);

        expect(response.body).toEqual(expectation);
      });

  });
});
