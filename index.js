const express = require('express');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index');
});

let todos = [];
app.post('/addtodo', function (req, res) {
  const newtodo = {
    id: uuidv4(),
    todo: req.body.todo,
  };
  todos.push(newtodo);
  console.log(todos);
  res.send(todos);
});
app.post('/updatetodo', function (req, res) {
  let todoIndex = todos.findIndex((todo) => todo.id === req.body.id);
  if (todoIndex !== -1) {
    todos[todoIndex].todo = req.body.todo;
    res.send(todos);
  } else {
    res.send('Todo not found');
  }
});
app.delete('/deleteTodo', function (req, res) {
  const todoIndex = todos.findIndex((todo) => todo.id === req.body.id);
  if (todoIndex !== -1) {
    todos = todos.filter((todo) => todo !== todos[todoIndex]);
    res.send(todos);
  } else {
    res.status(404).send('Todos not found');
  }
});

app.listen(port, () => {
  console.log(`server ins running ${port}`);
});
