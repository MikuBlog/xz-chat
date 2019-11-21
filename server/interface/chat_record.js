const chatRecordSchema = require('../database/schema/chat_record')

// 记录数据
function insertRecord(req, res) {
  const data = req.body
  if (!data.content || !data.sender || !data.recipient || !data.createtime) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  data.isshow = true
  chatRecordSchema.create(data, err => {
    if (err) {
      res.send({
        status: "error",
        msg: "服务器出错"
      })
    } else {
      res.send({
        status: "ok",
        msg: "数据记录成功"
      })
    }
  })
}

function insertAllRecord(req, res) {
  const data = req.body
  const list = JSON.parse(data.contentList), dataArr = []
  if(!list.length) {
    res.send({
      status: "ok",
      msg: "没有任何聊天记录"
    })
    return
  }
  list.forEach(val => {
    val.isshow = true
    dataArr.push(new chatRecordSchema(val))
  })
  chatRecordSchema.insertMany(dataArr, err => {
    if (err) {
      res.send({
        status: "error",
        msg: "服务器出错"
      })
    } else {
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
  if (!data.id) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  chatRecordSchema
    .updateOne(
      { id: data.id },
      { $set: { isshow: false } },
      err => {
        if (err) {
          res.send({
            status: "error",
            msg: "修改失败"
          })
        } else {
          res.send({
            status: "ok",
            msg: "撤回成功"
          })
        }
      }
    )
}

// 获取聊天记录
function getRecord(req, res) {
  const
    data = req.urlQuery,
    size = req.urlQuery.size || 10
  if (!data.page || !data.mapkey) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  chatRecordSchema
    .find(
      {
        isshow: true,
        mapkey: data.mapkey
      }
    )
    .sort({ createtime: 'desc' })
    .skip((data.page - 1) * size)
    .limit(+size)
    .exec((err, result) => {
      if (err) {
        res.send({
          status: "error",
          msg: "服务器出错"
        })
      } else {
        res.send({
          status: "ok",
          msg: "获取聊天记录成功",
          list: result
        })
      }
    })
}

module.exports = {
  insertRecord: insertRecord,
  insertAllRecord: insertAllRecord,
  withdrawRecord: withdrawRecord,
  getRecord: getRecord
}

