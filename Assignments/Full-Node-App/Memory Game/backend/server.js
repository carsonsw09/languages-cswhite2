const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

// Setup connection to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// GET /players - Get list of players
app.get('/players', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching players');
  }
});

// POST /new-player - Create a new player
app.post('/new-player', async (req, res) => {
  try {
    const newPlayerCount = await pool.query('SELECT COUNT(*) FROM users');
    const newPlayerNumber = parseInt(newPlayerCount.rows[0].count) + 1;
    const newPlayerName = `Player${newPlayerNumber}`;

    const result = await pool.query('INSERT INTO users (username) VALUES ($1) RETURNING *', [newPlayerName]);
    res.json(result.rows[0]);  // Return the new player
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating new player');
  }
});

// POST /save-game - Save a game session for the selected player
app.post('/save-game', async (req, res) => {
  const { userId, score, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO games (user_id, score, time) VALUES ($1, $2, $3) RETURNING id',
      [userId, score, time]
    );
    res.json({ gameId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving game');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
