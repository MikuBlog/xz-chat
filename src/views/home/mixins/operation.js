export default {
  beforeDestroy() {
    this.$.ajax({
      url: `${requestUrl}/api/user/logout?id=${this.$getMemorySes("user")._id}`,
      type: "get"
    }).then(result => {
      if(result.status == 'ok') {
        this.$successMsg(`${result.msg}`)
        this.socketInRoom.send("outline")
        this.socketInFace.close()
        this.socketInRoom.close()
      }else {
        this.$errorMsg(`${data.msg}`)
      }
    })
  },
  methods: {
    // 发送记录
    sendRecord() {
      if(this.textarea && this.chatObj.username) {
        this.$.ajax({
          url: `${requestUrl}/api/chat/insertrecord`,
          type: 'post',
          data: {
            content: this.textarea,
            sender: this.user.username,
            recipient: this.chatObj.username,
            createtime: new Date(),
            mapkey: `${Number(this.user.key) + Number(this.chatObj.key)}`
          }
        }).then(result => {
          this.textarea = ""
          this.getRecordList(this.chatObj)
        })
      }
    },
    // 初始化聊天内容高度
    initialChatHeight() {
      const viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1]
      viewScroll.scrollTop = viewScroll.scrollHeight
    },
    // 初始化聊天记录
    initialRecordList(list) {
      this.contentList.splice(0)
      list.forEach(val => {
        this.contentList.push(val)
      })
    },
    // 获取聊天记录
    getRecordList(item) {
      this.chatObj = item
      this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=1&size=100&mapkey=${Number(this.user.key) + Number(this.chatObj.key)}`,
        type: "get"
      }).then(result => {
        this.initialRecordList(result.list)
        this.$nextTick(() => {
          this.initialChatHeight()
        })
      })
    },
    // 向服务器发送推送
    sendContent() {
      this.socketInFace.send(JSON.stringify({
        content: this.textarea,
        sender: this.user.username,
        recipient: this.chatObj.username
      }))
      this.textarea = ""
    },
    // 面对面连接
    connectWebsocketInFace(item) {
      this.chatObj = item
      this.socketInFace && this.socketInFace.close()
      if(window.WebSocket) {
        this.socketInFace = new WebSocket(websocketInFaceUrl)
        this.socketInFace.onopen = e => {
          console.log("连接成功")
        }
        this.socketInFace.onmessage = e => {
          this.contentList.push(JSON.parse(e.data))
          this.$nextTick(() => {
            this.initialChatHeight()
          })
        }
        this.socketInFace.onerror = e => {
          console.log("出错了")
        }
        this.socketInFace.onclose = e => {
          console.log("关闭连接")
        }
      }else {
        this.$warnMsg("浏览器版本过低，请切换到高版本浏览器")
      }
    }
  }
}