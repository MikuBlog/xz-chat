const ws = require('nodejs-websocket')
const moment = require('moment')

const server = ws.createServer(con => {
  con.on('text', obj => {
    boardcast()
  })
  con.on('close', (code, reason) => {
    console.log("关闭连接")
  })
  con.on('error', (code, reason) => {
    console.log("异常关闭")
  })
}).listen(8891)

function boardcast() {
  server.connections.forEach(con => {
    con.sendText("notification")
  })
}

function getDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

