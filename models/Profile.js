const mongoose = require("mongoose");

const Schema = mongoose.Schema;
var profileSchema = new Schema({
  type: {
    type: String
  },
  descript: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})
var Profile = mongoose.model('profiles', profileSchema)


module.exports = Profile;