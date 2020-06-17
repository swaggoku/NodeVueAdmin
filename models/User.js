const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})
var User = mongoose.model('users', userSchema)


module.exports = User;