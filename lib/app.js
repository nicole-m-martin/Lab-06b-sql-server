const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`
  });
});

// GET the whole wild animal array endpoint
app.get('/wildAnimals', async(req, res) => {
  try {
    const data = await client.query('SELECT * from wildAnimals');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

// GET a single wild animal from id endpoint
app.get('/wildAnimals/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query('SELECT * from wildAnimals where id=$1', [id]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

// POST route inserts a new animal endpoint
app.post('/wildAnimals', async(req, res) => {
  try {
    const data = await client.query(`INSERT into wildAnimals (animal_common_name, animal_science_name, color, 
    amount, is_fun, owner_id)
    values ($1, $2, $3, $4, $5, $6)
    returning *`, 
    [ 
      req.animal.animal_common_name, 
      req.animal.animal_science_name, 
      req.animal.color, 
      req.animal.amount, 
      req.animal.is_fun, 
      req.user.id
    ]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

// PUT route to update an animal object endpoint
app.put('/wildAnimals/:id', async(req, res) => {
  
  const id = req.params.id;

  try {
    const data = await client.query(`
      UPDATE wildAnimals
      SET animal_common_name = $2, animal_science_name = $3, color = $4, amount = $5, is_fun = $6
      WHERE id=$1
      returning *;
    `,
   
    [id,
      req.animal.animal_common_name, 
      req.animal.animal_science_name, 
      req.animal.color, 
      req.animal.amount, 
      req.animal.is_fun, 
      req.user.id
      
    ]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

// DELETE route to remove an animal from DB endpoint
app.delete('/wildAnimals/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query('delete from wildAnimals where id=$1 returning *', [id]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});


app.use(require('./middleware/error'));

module.exports = app;
