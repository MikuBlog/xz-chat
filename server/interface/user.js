const accountSchema = require('../database/schema/user')
// 注册
function register(req, res) {
  const data = req.body
  if(!data.account || !data.password) {
    res.send({
      status: "error",
      msg: "请填写用户名和密码"
    })
    return
  }
  new Promise((resolve, reject) => {
    accountSchema
      .find(
        { account: data.account },
        (err, result) => {
          if(err) {
            res.send({
              status: "error",
              msg: "服务器出错"
            })
          }else if(result.length > 0) {
            reject()
          }else {
            resolve()
          }
        }
      )
  }).then(() => {
    accountSchema.create(data, err => {
      if(err) {
        res.send({
          status: "error",
          msg: "服务器出错"
        })
      }else {
        res.send({
          status: "ok",
          msg: "注册成功"
        })
      }
    })
  }).catch(() => {
    res.send({
      status: "error",
      msg: "账号已存在"
    })
  })
}

// 登录
function login(req, res) {
  const data = req.data
  if(!data.account || !data.password) {
    res.send({
      status: "error",
      msg: "请填写用户名和密码"
    })
    return
  }
  accountSchema
    .find(
      { account: data.account, password: data.password },
      (err, result) => {
        if(err) {
          res.send({
            status: 'error',
            msg: "服务器出错"
          })
          return
        }else if(result.length > 0) {
          res.send({
            status: "ok",
            msg: "登录成功"
          })
        }else {
          res.send({
            status: "error",
            msg: "账号或密码错误"
          })
        }
      }
    )
}

module.exports = {
  login: login,
  register: register
}