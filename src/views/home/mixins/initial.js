export default {
  created() {
    document.title = "聊天室"
    // 初始化用户信息
    this.initialProfile()
  },
  mounted() {
    // 初始化滚动监听
    this.initialListener()
  },
  methods: {
    // 初始化用户信息
    initialUserList(onlineUserList, outlineUserList) {
      this.onlineUserList = onlineUserList
      this.outlineUserList = outlineUserList
    },
    // 进入房间建立websocket
    connectWebsocketInRoom() {
      this.socketInRoom && this.socketInRoom.close()
      if (window.WebSocket) {
        this.socketInRoom = new WebSocket(websocketInRoomUrl)
        this.socketInRoom.onopen = e => {
          this.isonline = true
          this.user.type = "online"
          this.socketInRoom.send(JSON.stringify(this.user))
        }
        this.socketInRoom.onmessage = e => {
          const data = JSON.parse(e.data)
          this.initialUserList(data.onlineUserList, data.outlineUserList)
        }
        this.socketInRoom.onerror = e => {
          console.log("出错了")
        }
        this.socketInRoom.onclose = e => {
          console.log("退出聊天室大厅")
        }
      } else {
        this.$warnMsg("浏览器版本过低，请切换到高版本浏览器")
      }
    },
    // 初始化监听器
    initialListener() {
      const viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1]
      viewScroll.addEventListener('scroll', e => {
        if (viewScroll.scrollTop == 0) {
          this.page++
          this.continueToGetRecordList()
        }
      })
      window.onbeforeunload = () => {
        this.logout()
        return "确认是否离开室";
      };
    },
    // 初始化用户信息
    initialProfile() {
      if(!this.$getMemorySes('user')) {
        this.$router.push('/login')
      }else {
        for (let key in this.$getMemorySes('user')) {
          this.user[key] = this.$getMemorySes('user')[key]
        }
        // 进入房间建立连接
        this.connectWebsocketInRoom()
      }
    },
  },
}