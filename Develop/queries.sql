-- Create a table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into the table
INSERT INTO users (id, name, email) VALUES (1, 'John Doe', 'john.doe@example.com');
INSERT INTO users (id, name, email) VALUES (2, 'Jane Smith', 'jane.smith@example.com');

-- Select data from the table
SELECT * FROM users;

-- Update data in the table
UPDATE users SET email = 'john.newemail@example.com' WHERE id = 1;

-- Delete data from the table
DELETE FROM users WHERE id = 2;