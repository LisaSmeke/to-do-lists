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

//Create a list with a Title
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

//Display all lists
app.get('/lists', (req, res) => {
  db.query('SELECT * FROM lists', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.put('/update', (req, res) => {
//   const id = req.body.id;
//   const title = req.body.title;
//   db.query('UPDATE lists SET title = ? WHERE id = ?', [title, id], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM lists WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Create to-do
// app.post('/todo', (req, res) => {
//   const id = req.body.id;
//   const todo = req.body.todo;

//   db.query(`INSERT INTO todos (todo) VALUES(?,?)`, [todo, id], (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send('To-do inserted');
//     }
//   });
// });

//Display todos
// app.get('/todos', (req, res) => {
//   db.query('SELECT * FROM todos', (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => console.log('Your server is running on port 3001'));
