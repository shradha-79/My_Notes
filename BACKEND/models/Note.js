const mongoose = require('mongoose');
const { Schema } = mongoose;

//schema or data belongs to this particular model
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});
//makes a folder 'notes' if doesnt exist and add data into that
module.exports = mongoose.model('notes', NotesSchema);