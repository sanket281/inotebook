//In schema we describe the structure in which the data is going to be stored inside the database

const mongoose = require ("mongoose");
const {Schema} = mongoose;

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
        reuired: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user', UserSchema); 
  module.exports = User;