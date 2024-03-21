`CREATE TABLE users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                CONSTRAINT unique_username CHECK (username REGEXP '^[^\\s]+$') -- Named constraint
            );
      `
      
const _2 = `CREATE TABLE code_snippet_submissions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER REFERENCES users(user_id),
    preferred_language TEXT,  -- Change to VARCHAR(255) if you have a limit on language name length
    stdin TEXT,
    source_code TEXT,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
                      
    `
const _3 = `ALTER TABLE code_snippet_submissions
                            ADD CONSTRAINT language_check CHECK (preferred_language IN ('C++', 'Java', 'JavaScript', 'Python'));
    `

const _4 = `INSERT INTO users (username)
VALUES ('username1'), ('username2'), ('username3');
`

const _5 = `INSERT INTO code_snippet_submissions (user_id, preferred_language, stdin, source_code)
VALUES (1, 'C++', 'This is a sample standard input', '// Your C++ code here'),
       (2, 'Java', 'This is another input for Java', '// Your Java code here'),
       (3, 'Python', 'Python data can go here', '// Your Python code here');
`