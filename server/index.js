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

//Create a list with a title
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

//Update list title
app.put('/update', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  db.query('UPDATE lists SET title = ? WHERE id = ?', [title, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Delete list
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

//Create a to-do
app.post('/createtodo', (req, res) => {
  const todo = req.body.todo;
  const done = req.body.done;

  db.query('INSERT INTO todos (todo, done) VALUES(?,?)', [todo, done], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Todo inserted');
    }
  });
});

//Display all to-dos
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Display done to-dos
app.get('/donetodos', (req, res) => {
  db.query('SELECT todo FROM todos WHERE done = 1', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update a to-do
app.put('/updatetodo', (req, res) => {
  const id = req.body.id;
  const done = req.body.done;
  db.query('UPDATE todos SET done = ? WHERE id = ?', [done, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Delete a to-do
app.delete('/deletetodo/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => console.log('Your server is running on port 3001'));
