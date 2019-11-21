const accountSchema = require('../database/schema/user')

// 注册
function register(req, res) {
  const data = req.body
  if (!data.username || !data.password) {
    res.send({
      status: "error",
      msg: "请填写用户名和密码"
    })
    return
  }
  data.isonline = false
  data.key = new Date().getTime()
  new Promise((resolve, reject) => {
    accountSchema
      .find(
        { username: data.username },
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
  const data = req.body
  if (!data.username || !data.password) {
    res.send({
      status: "error",
      msg: "请填写用户名和密码"
    })
    return
  }
  new Promise((resolve, reject) => {
    accountSchema
      .find(
        { username: data.username, password: data.password, isonline: false },
        (err, result) => {
          if (err) {
            reject("服务器出错")
          } else if (result.length > 0) {
            resolve(result[0])
          } else {
            reject("账号、密码错误或已经登录")
          }
        }
      )
  }).then((result) => {
    accountSchema
      .updateOne(
        { username: data.username },
        { $set: { isonline: true } },
        err => {
          if (err) {
            reject("服务器出错")
          } else {
            res.send({
              status: "ok",
              msg: "登录成功",
              data: result
            })
          }
        }
      )
  }).catch(e => {
    res.send({
      status: "error",
      msg: e
    })
  })
}

// 用户登出
function logout(req, res) {
  const data = req.urlQuery
  if (!data.username) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  accountSchema
    .updateOne(
      { username: data.username },
      { $set: { isonline: false } },
      err => {
        if (err) {
          res.send({
            status: "error",
            msg: "登出失败"
          })
        } else {
          res.send({
            status: "ok",
            msg: "登出成功"
          })
        }
      }
    )
}

function getUserList(req, res) {
  const data = req.urlQuery
  accountSchema
    .$where(`this.username != "${data.username}"`)
    .exec((err, result) => {
      if (err) {
        res.send({
          status: "error",
          msg: "获取用户列表失败"
        })
      } else {
        res.send({
          status: "ok",
          msg: "获取用户列表成功",
          list: result
        })
      }
    })
}

module.exports = {
  login: login,
  register: register,
  logout: logout,
  getUserList: getUserList
}