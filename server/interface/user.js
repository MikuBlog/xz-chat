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
  data.name = data.username
  data.avatar = "http://myinterface.xuanzai.top/getPicture?type=error"
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

// 获取用户列表
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

// 获取用户信息
function getUserMsg(req, res) {
  const data = req.urlQuery
  if (!data.username) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  accountSchema
    .find(
      { username: data.username },
      (err, result) => {
        if (err) {
          res.send({
            status: "error",
            msg: "用户不存在"
          })
        } else {
          res.send({
            status: "ok",
            msg: "获取用户信息成功",
            data: result[0]
          })
        }
      }
    )
}

// 修改用户信息
function editUserMsg(req, res) {
  const data = req.body
  if (!data.username || !data.age || !data.name || !data.phone || !data.password || !data.email) {
    res.send({
      status: "error",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  new Promise((resolve, reject) => {
    accountSchema
      .updateOne(
        { username: data.username },
        { $set: { name: data.name, age: data.age, phone: data.phone, email: data.email, password: data.password } },
        err => {
          if (err) {
            reject("服务器出错")
          } else {
            resolve()
          }
        }
      )
  }).then(() => {
    return new Promise((resolve, reject) => {
      accountSchema
        .find(
          { username: data.username },
          (err, result) => {
            if (err) {
              reject("服务器出错")
            } else {
              res.send({
                status: "ok",
                msg: "修改用户信息成功",
                data: result[0]
              })
            }
          }
        )
    })
  }).catch(e => {
    res.send({
      status: "error",
      msg: e
    })
  })
}

// 上传用户头像
function editAvatar(req, res) {
  const data = req.body
  if (!data.username) {
    res.send({
      status: "errror",
      msg: "参数不正确或缺少参数"
    })
    return
  }
  accountSchema
    .updateOne(
      { username: data.username },
      { $set: { avatar: `/source/images/${data.filename}` } },
      err => {
        if (err) {
          res.send({
            status: "error",
            msg: "修改头像失败"
          })
        } else {
          res.send({
            status: "ok",
            msg: "修改头像成功",
            url: `/source/images/${data.filename}`
          })
        }
      }
    )
}

module.exports = {
  login: login,
  register: register,
  logout: logout,
  getUserList: getUserList,
  getUserMsg: getUserMsg,
  editAvatar: editAvatar,
  editUserMsg: editUserMsg
}