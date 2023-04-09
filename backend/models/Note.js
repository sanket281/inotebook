//In schema we describe the structure in which the data is going to be stored inside the database

const mongoose = require ("mongoose");
const {Schema} = mongoose;

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
        default: "general"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  
  module.exports = mongoose.model('notes', NotesSchema); 