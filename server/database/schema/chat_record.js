const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  content: String,
  sender: String,
  recipient: String,
  createtime: Date,
  isshow: Boolean,
  mapkey: String,
  type: String
})
module.exports = mongoose.model('chat_record', Schema)
