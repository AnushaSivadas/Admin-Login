const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        requried: [true, 'Username cannot be blank']
    },
    email:{
        type:String,
        requried: [true, 'Email Id cannot be blank']
    },
    password: {
        type: String,
        requried: [true, 'Password cannot be blank']
    }
})

module.exports = mongoose.model('User',userSchema);