-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  games_played INT DEFAULT 0,
  fastest_time INT  -- in seconds, NULL if no completed games
);
