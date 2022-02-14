const mongoose = require('mongoose');
const { Schema } = mongoose;

//schema or data belongs to this particular model
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});
//makes a folder 'user' if doesnt exist and add data into that
const User = mongoose.model('user', UserSchema);
module.exports = User;