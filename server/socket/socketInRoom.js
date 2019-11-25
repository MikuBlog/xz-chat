const accountSchema = require('../database/schema/user')
// 存放保持心跳的websocket列表
let contectors = []
// 存放用户列表
let onlineUserList = []

function server(ws, req) {
  contectors.push(ws)
  let time_1 = new Date().getTime()
  // 给新的websocket加上心跳检测
  ws.heartClock = setInterval(() => {
    ws.send(JSON.stringify({
      type: "isheartbeat"
    }))
  }, 10000)
  ws.onmessage = msg => {
    const data = JSON.parse(msg.data)
    ws.user = data
    justify(data)
  }
  ws.on('close', () => {
    // websocket关闭，心跳检测关闭
    clearInterval(ws.heartClock)
    // 意外退出(强行把用户踢下线)
    if (ws.user.type !== 'outline') {
      tickUser(ws.user, 'tick')
      getUserList()
    }
    contectors = contectors.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
  // 判断websocket发送的信息
  function justify(data) {
    // 心跳检测
    if (data.type === 'isheartbeat' && data.username) {
      let time_2 = new Date().getTime()
      if (time_2 - time_1 > 20000) {
        clearInterval(ws.heartClock)
        ws.close()
      } else {
        time_1 = new Date().getTime()
      }
    }
    // 用户登录 
    else if (data.type === 'online' && data.username) {
      // 把重复登录的用户踢出
      tickUser(data, 'isonline')
      onlineUserList.push(data)
      getUserList()
    }
    // 修改用户信息，触发更新用户列表 
    else if (data.type === 'update') {
      getUserList()
    }
    // 如果接收到用户的主动退出信息，将其状态改为离线
    else if (data.type === 'outline' && data.username) {
      tickUser(data, 'tick')
      getUserList()
    }
  }
  // 踢出用户
  function tickUser(data, type) {
    for (let i = 0, len = onlineUserList.length; i < len; i++) {
      if (onlineUserList[i].username === data.username) {
        // 客户端主动发出踢出信息，直接清除用户信息
        if (type === 'tick') {
          onlineUserList.splice(i, 1)
          break
        }
        // 服务端检测用户重复登录，服务端主动踢出用户（挤掉另一端用户）
        else {
          contectors[i].send(JSON.stringify({
            type: "isonline"
          }))
        }
      }
    }
  }
  // 获取用户列表（筛选出在线用户与离线用户）
  function getUserList() {
    new Promise((resolve, reject) => {
      getAllUserList(resolve, reject)
    }).then((result) => {
      const list = []
      result.forEach(val => {
        for (let i = 0, len = onlineUserList.length; i < len; i++) {
          if (val.username === onlineUserList[i].username) {
            onlineUserList[i] = val
            return
          }
        }
        list.push(val)
      })
      contectors.forEach(socket => {
        if (socket.readyState == 2) {
          return
        }
        socket.send(JSON.stringify({
          onlineUserList: onlineUserList,
          outlineUserList: list,
          type: 'getlist'
        }))
      })
    }).catch(e => {
      console.log(e)
    })
  }
}

// 获取所有用户
function getAllUserList(resolve, reject) {
  accountSchema
    .find()
    .exec((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
}

module.exports = {
  server: server
}
