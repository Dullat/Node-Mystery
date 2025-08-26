const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide the name"],
        trim: true,
        maxlenght: [20, 'name cant be more then 20 char']
    },
    completed: {
        type: Boolean,
        
    }
})

const Task = mongoose.model('Users', TaskSchema)

module.exports = Task