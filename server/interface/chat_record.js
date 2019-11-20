const chatRecordSchema = require('../database/schema/chat_record')
//引入url,用于分析传入url后的参数
const url = require('url')

// 记录数据
function record(req, res) {
  const data = req.body
  if(!data.content || !data.sender || !data.recipient || !data.createtime) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  chatRecordSchema.create(data, err => {
    if(err) {
      res.send({
        status: "error",
        msg: "服务器出错"
      })
    }else {
      res.send({
        status: "ok",
        msg: "数据记录成功"
      })
    }
  })
}

// 撤回聊天记录
function withdrawRecord(req, res) {
  const data = req.urlQuery
  if(!data.id) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
}

// 获取聊天记录
function getRecord(req, res) {
  const 
    data = req.urlQuery,
    size = req.urlQuery.size || 10
  if(!data.page || !data.recipient || !data.sender) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  chatRecordSchema
    .find(
      { isshow: true }
    )
    .skip(( data.page - 1 ) * size)
    .limit(size)
    .exec((err, result) => {
      if(err) {
        res.send({
          status: "error",
          msg: "服务器出错"
        })
      }else {
        res.send({
          status: "ok",
          msg: "获取聊天记录成功",
          list: result
        })
      }
    })
}

