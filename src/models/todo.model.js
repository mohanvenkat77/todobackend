const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String,
    required: true
  }
})

const todo = new mongoose.model('todo', TodoItemSchema);

module.exports = todo;