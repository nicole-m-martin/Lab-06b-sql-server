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
    const data = await client.query(`
     SELECT 
     wildAnimals.id, 
     wildAnimals.kind,
     wildAnimals.age,
     wildAnimals.is_fun,
     wildAnimals.owner_id,
     wildAnimals.size_id
     FROM wildAnimals
     JOIN sizes
     ON wildAnimals.size_id = sizes.id 
     ORDER BY wildAnimals.id`);
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

// GET a single wild animal from id endpoint
app.get('/wildAnimals/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query(`
    SELECT 
    wildAnimals.id, 
    wildAnimals.kind,
    wildAnimals.age,
    wildAnimals.is_fun,
    sizes.size as size,
    wildAnimals.owner_id,
    wildAnimals.size_id
    FROM wildAnimals
    JOIN sizes
    ON wildAnimals.size_id = sizes.id 
    WHERE wildAnimals.id=$1`, [id]);


    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

// GET sizes table endpoint (for dropdown list)
app.get('/sizes', async(req, res) => {
  try {
    const data = await client.query('SELECT * FROM sizes');
    
    res.json(data.rows);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});


// DELETE route to remove an animal from DB endpoint
app.delete('/wildAnimals/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query('DELETE from wildAnimals where id=$1 returning *', [id]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});

// POST route inserts a new animal endpoint
app.post('/wildAnimals', async(req, res) => {
  try {
    
    const data = await client.query(
      `INSERT INTO wildAnimals 
     (kind, size_id, age, is_fun, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `, 

      [
        req.body.kind, 
        req.body.size_id, 
        req.body.age, 
        req.body.is_fun, 
        1
      ]);
    
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

// PUT route to update an animal object endpoint
app.put('/wildAnimals/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const data = await client.query(`
      UPDATE wildAnimals
      SET kind = $1, size_id = $2, age = $3, is_fun = $4
      WHERE id = $5
      returning * ;`
      
    ,
   
    [
      req.body.kind, 
      req.body.size_id,
      req.body.age, 
      req.body.is_fun,
      id 
      
    ]);

    res.json(data.rows[0]);
  } catch(e) {

    res.status(500).json({ error: e.message });
  }
});




app.use(require('./middleware/error'));

module.exports = app;
