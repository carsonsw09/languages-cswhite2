const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;  // You can change this to 4000 if needed

// Serve static files from the 'public' folder
app.use(express.static('public'));
app.use(express.json());

// Database connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Log database connection success or error
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);  // Logs database connection error
  } else {
    console.log('Connected to the database');
  }
});

// API route for looking up state capitals
app.post('/lookup', async (req, res) => {
  const stateName = req.body.state;
  try {
    const result = await pool.query('SELECT capital FROM states WHERE state_name = $1', [stateName]);
    if (result.rows.length > 0) {
      res.json({ capital: result.rows[0].capital });
    } else {
      res.json({ capital: 'State not found' });
    }
  } catch (error) {
    console.error(error);  // Logs any query errors
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server with error handling
app.listen(port, (err) => {
  if (err) {
    console.error('Error starting server:', err);  // Logs if there's an error starting the server
  } else {
    console.log(`Server running at http://localhost:${port}`);
  }
});
