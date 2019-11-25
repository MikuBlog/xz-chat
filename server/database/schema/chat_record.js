const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
  content: String,
  senderusername: String, 
  sendername: String,
  avatar: String,
  recipient: String,
  createtime: Date,
  isshow: Boolean,
  mapkey: String,
  key: String,
  type: String
})
module.exports = mongoose.model('chat_record', Schema)
