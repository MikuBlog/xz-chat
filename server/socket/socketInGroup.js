const moment = require('moment')
// 存放websocket连接
let contectors = []

function server(ws, req) {
  contectors.push(ws)
  ws.onmessage = msg => {
    msg = JSON.parse(msg.data)
    contectors.forEach(socket => {
      socket.send(JSON.stringify({
        createtime: getDate(),
        content: msg.content,
        sender: msg.sender,
        recipient: msg.recipient,
        type: msg.type
      }))
    })
  }
  ws.on('close', () => {
    contectors = contectors.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
}

function getDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  server: server
}

