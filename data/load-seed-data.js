const client = require('../lib/client');
const { wildAnimals } = require('./wildAnimals.js');
const  sizeData  = require('./sizes');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');


run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      sizeData.map(size => {
        return client.query(`
                      INSERT INTO sizes (size)
                      VALUES ($1)
                      RETURNING *;
                  `,
        [size.size]);
      })
    );

    await Promise.all(
      wildAnimals.map(animal => {
        return client.query(`
        INSERT INTO wildAnimals (kind, size_id, age, is_fun, owner_id)
          VALUES ($1, $2, $3, $4, $5)`,

        [animal.kind, 
          animal.size_id, 
          animal.age, 
          animal.is_fun, 
          user.id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
