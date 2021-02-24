const client = require('../lib/client');
const { wildAnimals } = require('./wildAnimals.js');
const  colorData  = require('./colors');
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
      colorData.map(color => {
        return client.query(`
                      INSERT INTO colors (color)
                      VALUES ($1)
                      RETURNING *;
                  `,
        [color.color]);
      })
    );

    await Promise.all(
      wildAnimals.map(animal => {
        return client.query(`
        INSERT INTO wildAnimals (animal_common_name,
          animal_science_name, color_id, amount, is_fun, owner_id)
          VALUES ($1, $2, $3, $4, $5, $6)`,

        [animal.animal_common_name, 
          animal.animal_science_name, 
          animal.color_id, 
          animal.amount, 
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
