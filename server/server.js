const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(__dirname + '/database.sqlite', (err) => {
  if (err) console.error('DB error:', err.message);
  else console.log('✅ Connected to SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT
)`);

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) =>
    err ? res.status(500).send(err) : res.json(rows)
  );
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    return err
      ? res.status(500).send(err)
      : res.json({ id: this.lastID, name, email });
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
