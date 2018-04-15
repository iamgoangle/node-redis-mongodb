const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todos = require('./models/todos');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// mongoose.connect('mongodb://my-mongodb/todo');
mongoose.connect('mongodb://localhost:27017/todos');

const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

app.get('/todos', async (req, res) => {
  const result = await todos.find({});
  res.status(200).json({
    success: true,
    data: result
  });
});

app.get('/todo/:title', async (req, res) => {
  if(!req.params.title) {
    res.status(400).json({
      success: false,
      message: "Invalid param"
    });
  }

  const result = await todos.findOne({ title: req.params.title });
  res.status(200).json({
    success: true,
    data: result
  });
});

app.post('/todo', async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      success: false,
      message: "Please send the todo body"
    });
  }

  let todo = new todos(req.body);
  await todo.save();
  res.status(200).json({
    success: true,
    data: todo
  });
});



app.listen(8080, () => {
  console.log("Listening on port 8080");
});
