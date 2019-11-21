export default {
  created() {
    // 初始化用户信息
    this.initialProfile()
    // 进入房间建立连接
    this.connectWebsocketInRoom()
  },
  mounted() {
    // 初始化滚动监听
    this.initialListener()
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
          this.getUserList()
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
    // 初始化监听器
    initialListener() {
      const viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1]
      viewScroll.addEventListener('scroll', e => {
        if(viewScroll.scrollTop == 0) {
          this.page ++
          this.continueToGetRecordList()
        }
      })
      window.onunload = () => {
        alert(123123)
      }
      console.log(window.onunload)
      window.onbeforeunload = () => {
        confirm(123123)
        // this.logout()
      }
    },
    // 初始化用户信息
    initialProfile() {
      for(let key in this.$getMemorySes('user')) {
        this.user[key] = this.$getMemorySes('user')[key]
      }
    },
    // 获取离线用户列表
    getUserList() {
      this.$.ajax({
        url: `${requestUrl}/api/user/getuserlist?username=${this.user.username}`,
        type: "get",
      }).then(result => {
        this.userList = result.list
      })
    },
  },
}