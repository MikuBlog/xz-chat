// 存放websocket连接
let contectors = []

function server(ws, req) {
  contectors.push(ws)
  ws.onmessage = msg => {
    contectors.forEach(socket => {
      socket.send("notification")
    })
  }
  ws.on('close', () => {
    contectors = contectors.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
}

module.exports = {
  server: server
}
