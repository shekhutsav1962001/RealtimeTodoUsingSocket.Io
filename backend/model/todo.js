var mongoose = require('mongoose')
var todoSchema = mongoose.Schema({
    
    description: {
        type: String,
      
    }
})
module.exports = mongoose.model('todo',todoSchema)

