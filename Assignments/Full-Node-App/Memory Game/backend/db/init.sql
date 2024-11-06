-- Initialize users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE
);

-- Initialize games table to track game sessions
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  score INT NOT NULL,
  time INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predefined users: Player1, Player2, Player3
INSERT INTO users (username) VALUES ('Player1');
INSERT INTO users (username) VALUES ('Player2');
INSERT INTO users (username) VALUES ('Player3');
