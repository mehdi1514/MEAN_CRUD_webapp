const express = require('express');
const router = express.Router();
const Todo = require('../models/todos');

router.get('/todos', (req, res, next)=>{
    Todo.find(function(err, todos){
        if(err){
            res.json({msg: "Failed to load todos"});
        }
        res.json(todos);
    });
});

router.post('/todo', (req, res, next)=>{
    let newTodo = new Todo({
        title: req.body.title,
        date_created: req.body.date_created
    });

    newTodo.save((err, todo)=>{
        if(err){
            res.json({msg: 'Failed to add todo'});
        }
        else{
            res.json({msg: 'Todo added successfully'});
        }
    });
});

router.put('/todo/:id', (req, res) => {
    if(!req.body.title || req.body.title == "") {
        return res.status(400).send({
            message: "Todo title can not be empty"
        });
    }

    Todo.findByIdAndUpdate(req.params.id , {
        title: req.body.title,
        date_created: "25/05/2020",
    }, {new: true, useFindAndModify: false}).then((todo) => {
        if(!todo) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.json({msg: "Todo updated successfully"});
    }).catch((err) => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating todo with id " + req.params.id
        });
    });
});

router.delete('/todo/:id', (req, res, next)=>{
    Todo.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports = router;