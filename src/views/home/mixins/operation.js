export default {
  beforeDestroy() {
    this.logout()
  },
  methods: {
    // 登出
    logout() {
      this.$.ajax({
        url: `${requestUrl}/api/user/logout?id=${this.$getMemorySes("user")._id}`,
        type: "get"
      }).then(result => {
        if (result.status == 'ok') {
          this.$successMsg(`${result.msg}`)
          this.socketInRoom.send("outline")
          this.socketInFace.close()
          this.socketInRoom.close()
        } else {
          this.$errorMsg(`${data.msg}`)
        }
      })
    },
    // 存储聊天记录
    sendRecord() {
      this.$.ajax({
        url: `${requestUrl}/api/chat/insertrecord`,
        type: 'post',
        data: {
          content: this.textarea,
          recipient: this.chatObj.username,
          sender: this.user.username,
          createtime: new Date(),
          mapkey: `${Number(this.user.key) + Number(this.chatObj.key)}`
        }
      }).then(result => {
        this.loading = false
        if(result.status === 'error') {
          this.$errorMsg("服务器出错")
        }
      })
    },
    // 初始化聊天内容高度
    initialChatHeight() {
      const viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1]
      viewScroll.scrollTop = viewScroll.scrollHeight
    },
    // 初始化聊天记录
    initialRecordList(list) {
      this.ExistingContentList.splice(0)
      this.willSendContentList.splice(0)
      list.forEach(val => {
        this.ExistingContentList.push(val)
      })
      this.ExistingContentList = this.ExistingContentList.reverse()
    },
    insertRecordList(list) {
      list.forEach(val => {
        this.ExistingContentList.unshift(val)
      })
    },
    continueToGetRecordList() {
      this.getRecordLoading = true
      this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=${this.page}&size=${this.size}&mapkey=${Number(this.user.key) + Number(this.chatObj.key)}`,
        type: "get"
      }).then(result => {
        this.insertRecordList(result.list)
        this.getRecordLoading = false
        this.$nextTick(() => {
          const viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1]
          viewScroll.scrollTop = viewScroll.scrollTop + 20
        })
      })
    },
    // 获取聊天记录
    getRecordList() {
      this.page = 1
      this.getRecordLoading = true
      this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=${this.page}&size=${this.size}&mapkey=${Number(this.user.key) + Number(this.chatObj.key)}`,
        type: "get"
      }).then(result => {
        this.initialRecordList(result.list)
        this.$nextTick(() => {
          this.initialChatHeight()
        })
        this.getRecordLoading = false
      })
    },
    // 向服务器发送推送
    sendContent() {
      if (this.textarea && this.chatObj.username) {
        this.socketInFace.send(JSON.stringify({
          content: this.textarea,
          sender: this.user.username,
          recipient: this.chatObj.username
        }))
        this.sendRecord()
        this.loading = true
        this.textarea = ""
      }
    },
    // 面对面连接
    connectWebsocketInFace(item) {
      this.chatObj = item
      this.socketInFace && this.socketInFace.close()
      if (window.WebSocket) {
        this.socketInFace = new WebSocket(`${websocketInFaceUrl}${Number(this.user.key) + Number(this.chatObj.key)}`)
        this.socketInFace.onopen = e => {
          this.getRecordList()
        }
        this.socketInFace.onmessage = e => {
          this.willSendContentList.push(JSON.parse(e.data))
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
      } else {
        this.$warnMsg("浏览器版本过低，请切换到高版本浏览器")
      }
    }
  }
}