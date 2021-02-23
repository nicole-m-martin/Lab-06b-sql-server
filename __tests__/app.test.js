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

    // GET : return wild animal array TEST
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

    // GET : return one animal from animal array TEST
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


    // POST :  New animal TEST
    test('creates a new wild animal', async() => {
      const newAnimal = {
        animal_common_name: 'Jaguar',
        animal_science_name: 'Panthera onca',
        color: 'Neon Yellow',
        amount: 577,
        is_fun: true,
      };
      
      const expectedAnimal = {
        ...newAnimal,
        id: 31,
        owner_id: 1,
      };
      
      const data = await request(app)
        .post('/wildAnimals')
        .send(newAnimal)
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(data.body).toEqual(expectedAnimal);

      //   const allAnimals = await request(app)
      //     .get('/wildAnimals')
      //     .expect('Content-Type', /json/)
      //     .expect(500);

      //   const jaguar = allAnimals.body.find(animal => animal.animal_common_name === 'Jaguar');

      //   expect(jaguar).toEqual(expectedAnimal);
       
    });
      
    // DELETE : Delete a wild animal TEST
    test('deletes a single animal with the matching id', async() => {
      const expectation = {
        id: 24,
        animal_common_name: 'Arboral spiny rat',
        animal_science_name: 'Echimys chrysurus',
        color: 'Teal',
        amount: 70,
        is_fun: false,
        owner_id: 1
      };
      
      const data = await request(app)
        .delete('/wildAnimals/24')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(data.body).toEqual(expectation);
      
      const nothing = await request(app)
        .get('/wildAnimals/24')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(nothing.body).toEqual('');
    });

    // PUT : Update a wild animal object TEST

    test('updates a wild animal object', async() => {
      
      const updateAnimal = {
        animal_common_name: 'Llama',
        animal_science_name: 'Lama glama',
        color: 'Aquamarine',
        amount: 12,
        is_fun: true,
       
      };

      const expectedAnimal = {
        ...updateAnimal,
        owner_id: 1,
        id: 1
      };

      await request(app)
        .put('/wildAnimals/1')
        .send(updateAnimal)
        .expect('Content-Type', /json/)
        .expect(200);

      const updatedAnimal = await request(app)
        .get('/wildAnimals/1')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(updatedAnimal.body).toEqual(expectedAnimal);
    });

  });
});


