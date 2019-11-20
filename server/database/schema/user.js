const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  username: String,
  password: String,
  age: String,
  email: String,
  phone: String
})
module.exports = mongoose.model('user_list', Schema)
