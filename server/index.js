const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'sqlpswd',
  database: 'to_do_lists',
});

app.post('/create', (req, res) => {
  const title = req.body.title;

  db.query('INSERT INTO lists (title) VALUES(?)', [title], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Value inserted');
    }
  });
});

app.listen(3001, () => console.log('Your server is running on port 3001'));
