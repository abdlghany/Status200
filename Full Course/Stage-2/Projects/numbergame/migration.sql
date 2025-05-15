-- Create players table
CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100),
    city VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    created_at DATETIME DEFAULT NOW()
);

-- Create games table
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    random INT,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (player_id) REFERENCES players(id)
);

-- Create guesses table
CREATE TABLE guesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT,
    guess INT,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (game_id) REFERENCES games(id)
);