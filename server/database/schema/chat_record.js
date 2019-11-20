const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  content: String,
  sender: String,
  recipient: String,
  createtime: Date,
  ishow: Boolean
})
module.exports = mongoose.model('chat_record', Schema)
