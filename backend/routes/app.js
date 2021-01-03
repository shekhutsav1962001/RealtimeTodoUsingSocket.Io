var express = require('express')
var router = express.Router()
var Todo = require('../model/todo')

router.post('/todo',(req, res) => {
    console.log("yes in backend");
    const io = req.app.get('io');
    const todo = new Todo({
      description:req.body.description
    });
    todo.save((error, mydata) => {
        if (error) {
            console.log(error);
        }
        else {
            io.emit("add","Add no msg");  
            res.status(200).json({ msg: "sucess in add todo" })
        }
    })

  })
  
router.get('/todo',(req, res) => {
    Todo.find({}).then((todos)=>{
        res.send(todos);
    })
})


router.delete("/tododelete/:todoid",(req, res, next) => {
    var id = req.params.todoid
    const io = req.app.get('io');
    Todo.deleteOne({ _id: id }, (err) => {
        if (err)
            console.log("err in delete by admin");
    })
    io.emit("del","del no msg");  
    res.status(200).json({ msg: "sucess in delete todo" })
})
module.exports = router
