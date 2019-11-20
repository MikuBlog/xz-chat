const accountSchema = require('../database/schema/user')

// 注册
function register(req, res) {
  const data = req.body
  if (!data.account || !data.password) {
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
          if (err) {
            res.send({
              status: "error",
              msg: "服务器出错"
            })
          } else if (result.length > 0) {
            reject()
          } else {
            resolve()
          }
        }
      )
  }).then(() => {
    data.isonline = true
    accountSchema.create(data, err => {
      if (err) {
        res.send({
          status: "error",
          msg: "服务器出错"
        })
      } else {
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
  if (!data.account || !data.password) {
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
        if (err) {
          res.send({
            status: 'error',
            msg: "服务器出错"
          })
          return
        } else if (result.length > 0) {
          res.send({
            status: "ok",
            msg: "登录成功"
          })
        } else {
          res.send({
            status: "error",
            msg: "账号或密码错误"
          })
        }
      }
    )
}

// 用户登出
function logout(req, res) {
  const data = req.urlQuery
  if (!data.id) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  accountSchema
    .updateOne(
      { id: data.id },
      { $set: { isonline: false } },
      err => {
        if (err) {
          res.send({
            status: "error",
            msg: "登出失败"
          })
        } else {
          res.send({
            status: "error",
            msg: "登出成功"
          })
        }
      }
    )
}

function getUserList(req, res) {
  accountSchema
    .find(
      { isonline: true },
      (err, result) => {
        if(err) {
          res.send({
            status: "error",
            msg: "获取用户列表失败"
          })
        }else {
          res.send({
            status: "ok",
            msg: "获取用户列表成功",
            list: result
          })
        }
      }
    )
}

module.exports = {
  login: login,
  register: register,
  logout: logout,
  getUserList: getUserList
}