const accountSchema = require('../database/schema/user')
// 存放websocket连接
let contectors = []
// 存放用户列表
let onlineUserList = []

function server(ws, req) {
  contectors.push(ws)
  ws.onmessage = msg => {
    const data = JSON.parse(msg.data)
    onlineUserList = onlineUserList.filter(val => data.username !== val.username)
    if (data.type === 'online') {
      onlineUserList.push(data)
    }
    new Promise((resolve, reject) => {
      getOutLineList(resolve, reject)
    }).then((result) => {
      const list = []
      result.forEach(val => {
        for (let i = 0, len = onlineUserList.length; i < len; i++) {
          if (val.username === onlineUserList[i].username)
            return
        }
        list.push(val)
      })
      contectors.forEach(socket => {
        socket.send(JSON.stringify({
          onlineUserList: onlineUserList,
          outlineUserList: list
        }))
      })
    }).catch(e => {
      console.log(e)
    })
  }
  ws.on('close', () => {
    contectors = contectors.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
}

function getOutLineList(resolve, reject) {
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
