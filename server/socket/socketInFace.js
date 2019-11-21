const ws = require('nodejs-websocket')
const moment = require('moment')

const server = ws.createServer(con => {
  con.on('text', obj => {
    obj = JSON.parse(obj)
    boardcast({
      createtime: getDate(),
      content: obj.content,
      sender: obj.sender,
      recipient: obj.recipient
    })
  })
  con.on('close', (code, reason) => {
    console.log("关闭连接")
  })
  con.on('error', (code, reason) => {
    console.log("异常关闭")
  })
}).listen(8889)

function boardcast(obj) {
  server.connections.forEach(con => {
    con.sendText(JSON.stringify(obj))
  })
}

function getDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

