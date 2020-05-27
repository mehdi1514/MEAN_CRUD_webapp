const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    date_created:{
        type: String,
        required: true,
    }
});

const Todo = module.exports = mongoose.model('Todo', TodoSchema);