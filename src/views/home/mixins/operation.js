export default {
  beforeDestroy() {
    this.logout()
  },
  methods: {
    showEditUserBox() {
      const 
        userForm = this.$refs.userForm.ruleForm,
        user = this.user
      userForm.name = user.name
      userForm.age = user.age
      userForm.phone = user.phone
      userForm.email = user.email
      this.$refs.userForm.dialog = true
    },
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
        this.$setMemorySes('user', "")
        this.socketInRoom.close()
        this.disConnect()
      } catch (e) { }
    },
    // 断开websocket连接
    disConnect() {
      this.socketInGroup && (
        this.socketInGroup.close(),
        this.socketInGroup = ""
      )
      this.socketInFace && (
        this.socketInFace.close(),
        this.socketInFace = ""
      )
    },
    // 存储聊天记录
    sendRecord(type) {
      this.$.ajax({
        url: `${requestUrl}/api/chat/insertrecord`,
        type: 'post',
        data: {
          content: this.editor.txt.html(),
          recipient: this.chatObj.username,
          senderusername: this.user.username,
          sendername: this.user.name,
          avatar: this.user.avatar,
          createtime: this.sendTime,
          mapkey: `${Number(this.user.key) + Number(this.chatObj.key)}`,
          key: new Date(this.sendTime).getTime(),
          type: type,
        }
      }).then(result => {
        this.loading = false
        if (result.status === 'error') {
          this.$errorMsg("服务器出错")
        }
      })
    },
    // 存储撤回记录
    sendWithdrawRecord(obj) {
      this.$.ajax({
        url: `${requestUrl}/api/chat/insertrecord`,
        type: 'post',
        data: obj
      }).then(result => {
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
      return this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=${this.page}&size=${this.size}&mapkey=${Number(this.user.key) + Number(this.chatObj.key)}&type=face`,
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
      return this.$.ajax({
        url: `${requestUrl}/api/chat/getrecord?page=${this.page}&size=${this.size}&recipient=${this.chatObj.username}&type=group`,
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
      if (this.editor.txt.html() && this.chatObj.username) {
        this.sendTime = this.$formatDate(new Date(), true)
        if (this.isGroup) {
          this.socketInGroup.send(JSON.stringify({
            content: this.editor.txt.html(),
            senderusername: this.user.username,
            sendername: this.user.name,
            avatar: this.user.avatar,
            recipient: 'group',
            type: "group",
            createtime: this.sendTime,
            key: new Date(this.sendTime).getTime()
          }))
        } else {
          this.socketInFace.send(JSON.stringify({
            content: this.editor.txt.html(),
            senderusername: this.user.username,
            sendername: this.user.name,
            avatar: this.user.avatar,
            recipient: this.chatObj.username,
            type: "face",
            createtime: this.sendTime,
            key: new Date(this.sendTime).getTime()
          }))
        }
        this.sendRecord(this.isGroup ? 'group' : 'face')
        this.loading = true
        this.editor.txt.html("")
      }
    },
    sendContentQuick(code) {
      if (code === 10) {
        this.sendContent()
      }
    },
    // 撤回信息
    withdrawContent(item) {
      this.withdrawLoading = true
      this.$.ajax({
        url: `${requestUrl}/api/chat/withdrawrecord?key=${item.key}&senderusername=${item.senderusername}`,
        type: "get"
      }).then(result => {
        if (result.status === 'ok') {
          const obj = JSON.stringify({
            type: "update"
          })
          this.isGroup
            ? this.socketInGroup.send(obj)
            : this.socketInFace.send(obj)
          this.widthdrawSender = result.senderusername
          this.withdrawLoading = false
        } else {
          this.$errorMsg(`${result.msg}`)
        }
      })
    },
    // 发送撤回信息
    sendWithdrawContent() {
      this.sendTime = this.$formatDate(new Date(), true)
      const obj = {
        content: "撤回了一条消息",
        senderusername: this.user.username,
        sendername: this.user.name,
        avatar: this.user.avatar,
        recipient: this.chatObj.username,
        type: "withdraw",
        createtime: this.sendTime,
        key: new Date(this.sendTime).getTime()
      }
      this.isGroup
        ? (
          this.socketInGroup.send(JSON.stringify(obj))
        )
        : (
          obj.mapkey = `${Number(this.user.key) + Number(this.chatObj.key)}`,
          this.socketInFace.send(JSON.stringify(obj))
        )
      this.sendWithdrawRecord(obj)
    },
    // 群聊连接
    connectWebsocketInGroup(uid) {
      this.isGroup = true
      this.chatObj = {
        username: '群聊'
      }
      this.disConnect()
      if (window.WebSocket) {
        this.socketInGroup = new WebSocket(`${websocketInGroupUrl}${uid}`)
        this.socketInGroup.onopen = e => {
          this.getGroupRecordList()
        }
        this.socketInGroup.onmessage = e => {
          const data = JSON.parse(e.data)
          if (data.type === 'update') {
            (async () => {
              await this.getGroupRecordList()
              this.widthdrawSender === this.user.username && this.sendWithdrawContent()
              this.widthdrawSender = ""
            })();
          } else {
            this.willSendContentList.push(JSON.parse(e.data))
          }
          this.$nextTick(() => {
            this.initialChatHeight()
          })
        }
        this.socketInGroup.onerror = e => {
          console.log("出错了")
        }
        this.socketInGroup.onclose = e => {
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
      this.disConnect()
      if (window.WebSocket) {
        this.socketInFace = new WebSocket(`${websocketInFaceUrl}${Number(this.user.key) + Number(this.chatObj.key)}`)
        this.socketInFace.onopen = e => {
          this.getRecordList()
        }
        this.socketInFace.onmessage = e => {
          const data = JSON.parse(e.data)
          if (data.type === 'update') {
            (async () => {
              await this.getRecordList()
              this.widthdrawSender === this.user.username && this.sendWithdrawContent()
              this.widthdrawSender = ""
            })();
          } else {
            this.willSendContentList.push(JSON.parse(e.data))
          }
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