// 存放websocket连接
let contectors = []

function server(ws, req) {
  contectors.push(ws)
  ws.onmessage = msg => {
    msg = JSON.parse(msg.data)
    if(msg.type === 'update') {
      contectors.forEach(socket => {
        socket.send(JSON.stringify(msg))
      })
    }else {
      contectors.forEach(socket => {
        socket.send(JSON.stringify(msg))
      })
    }
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

