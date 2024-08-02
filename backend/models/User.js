const mongoose = require('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user',blogSchema);
 
  module.exports = User;