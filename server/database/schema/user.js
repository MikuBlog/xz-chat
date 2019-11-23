const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  avatar: String,
  age: String,
  email: String,
  phone: String,
  key: String,
  isonline: Boolean
})
module.exports = mongoose.model('user_list', Schema)
