-- Create players table
CREATE TABLE Players (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(100),
    player_city VARCHAR(100)
);

-- Create games table
CREATE TABLE Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT,
    game_score INT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- Insert players data
INSERT INTO Players (player_name, player_city)
VALUES 
    ("Karel van Zijl", "Kuala Lumpur"),
    ("John Doe", "Malacca"),
    ("Jane Doe", "George Town");

-- Insert games data
INSERT INTO Games (player_id, game_score)
VALUES 
    (1, 5),
    (1, 8),
    (1, 4),
    (2, 2),
    (2, 6),
    (2, 10),
    (2, 8),
    (2, 7);