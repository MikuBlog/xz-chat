export default {
  beforeDestroy() {
    this.logout()
  },
  methods: {
    // 登出
    logout() {
      this.$.ajax({
        url: `${requestUrl}/api/user/logout?username=${this.user.username}`,
        type: "get"
      })
      this.socketInRoom.send(JSON.stringify({
        username: this.user.username,
        type: 'outline'
      }))
      try {
        this.socketInRoom.close()
        this.socketInFace.close()
      } catch (e) { }
    },
    // 存储聊天记录
    sendRecord(type) {
      this.$.ajax({
        url: `${requestUrl}/api/chat/insertrecord`,
        type: 'post',
        data: {
          content: this.textarea,
          recipient: this.chatObj.username,
          sender: this.user.username,
          createtime: new Date(),
          mapkey: `${Number(this.user.key) + Number(this.chatObj.key)}`,
          type: type
        }
      }).then(result => {
        this.loading = false
        if (result.status === 'error') {
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
    // 获取群聊聊天记录
    getGroupRecordList() {
      this.page = 1
      this.getRecordLoading = true
      this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=${this.page}&size=${this.size}&type=group`,
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
        if (this.isGroup) {
          this.socketInFace.send(JSON.stringify({
            content: this.textarea,
            sender: this.user.username,
            recipient: 'group',
            type: "group"
          }))
        } else {
          this.socketInFace.send(JSON.stringify({
            content: this.textarea,
            sender: this.user.username,
            recipient: this.chatObj.username,
            type: "face"
          }))
        }
      }
      this.sendRecord(this.isGroup ? 'group' : 'face')
      this.loading = true
      this.textarea = ""
    },
    sendContentQuick(e) {
      if(e.keyCode === 10) {
        this.sendContent()
      }
    },
    // 群聊连接
    connectWebsocketInGroup(uid) {
      this.isGroup = true
      this.chatObj = {
        username: '群聊'
      }
      this.socketInFace && this.socketInFace.close()
      if (window.WebSocket) {
        this.socketInFace = new WebSocket(`${websocketInGroupUrl}${uid}`)
        this.socketInFace.onopen = e => {
          this.getGroupRecordList()
        }
        this.socketInFace.onmessage = e => {
          this.willSendContentList.push(JSON.parse(e.data))
          console.log(JSON.parse(e.data))
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
    },
    // 面对面连接
    connectWebsocketInFace(item) {
      this.chatObj = item
      this.isGroup = false
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