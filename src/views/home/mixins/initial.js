export default {
  created() {
    // 初始化用户信息
    this.initialProfile()
    // 进入房间建立连接
    this.connectWebsocketInRoom()
    // // 初始化在线用户列表
    // this.getOnlineUserList()
    // // 初始化离线用户列表
    // this.getOutlineUserList()
  },
  methods: {
    // 进入房间建立websocket
    connectWebsocketInRoom() {
      this.socketInRoom && this.socketInRoom.close()
      if(window.WebSocket) {
        this.socketInRoom = new WebSocket(websocketInRoomUrl)
        this.socketInRoom.onopen = e => {
          this.socketInRoom.send("online")
        }
        this.socketInRoom.onmessage = e => {
          this.getOnlineUserList()
          this.getOutlineUserList()
          // this.contentList.push(JSON.parse(e.data))
          // this.$nextTick(() => {
          //   this.initialChatHeight()
          // })
        }
        this.socketInRoom.onerror = e => {
          console.log("出错了")
        }
        this.socketInRoom.onclose = e => {
          console.log("退出聊天室大厅")
        }
      }else {
        this.$warnMsg("浏览器版本过低，请切换到高版本浏览器")
      }
    },
    initialProfile() {
      for(let key in this.$getMemorySes('user')) {
        this.user[key] = this.$getMemorySes('user')[key]
      }
    },
    // 获取离线用户列表
    getOutlineUserList() {
      this.$.ajax({
        url: `${requestUrl}/api/user/getuserlist?isonline=false&username=${this.user.username}`,
        type: "get",
      }).then(result => {
        this.outlineUserList = result.list
      })
    },
    // 获取在线用户列表
    getOnlineUserList() {
      this.$.ajax({
        url: `${requestUrl}/api/user/getuserlist?isonline=true&username=${this.user.username}`,
        type: "get",
      }).then(result => {
        this.onlineUserList = result.list
      })
    }
  },
}