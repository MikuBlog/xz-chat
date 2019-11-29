import convertHttp from '@/utils/convertHttp'
import E from "wangeditor";
import { clearInterval } from 'timers';
export default {
  data() {
    return {
      editor: "",
      convertHttp: convertHttp
    }
  },
  created() {
    document.title = "聊天室"
    // 初始化用户信息
    this.getUserMsg()
  },
  mounted() {
    // 初始化富文本编辑器
    this.initialEditor()
    // 初始化滚动监听
    this.initialListener()
  },
  methods: {
    // 初始化富文本编辑器
    initialEditor() {
      const
        editor = new E("#div1", "#div2"),
        _this = this;
      editor.customConfig.zIndex = 0;
      this.editor = editor;
      editor.customConfig.menus = [
        "emoticon",
        "fontSize", // 字号
        "fontName", // 字体
        "foreColor", // 文字颜色
        "justify", // 对齐方式
        'video',
        'image'  // 插入图片
      ];
      editor.customConfig.uploadImgServer = `${this.url}/salesman/fixOrder/uploadImage`;
      editor.customConfig.uploadImgShowBase64 = true
      editor.customConfig.uploadImgMaxLength = 1;
      editor.customConfig.uploadFileName = "file";
      editor.customConfig.customAlert = "";
      editor.customConfig.uploadImgMaxSize = 20 * 1024 * 1024
      editor.customConfig.uploadImgHeaders = {
        "content-type": "application/form-data"
      };
      editor.customConfig.emotions = [this.emoji, this.animal, this.food, this.activity, this.place]
      editor.customConfig.customUploadImg = function (files, insert) {
        const formData = new FormData();
        formData.append("image", files[0]);
        _this.$.ajax({
          url: `${requestUrl}/api/image/uploadimage`,
          type: "post",
          data: formData,
          processData: false,
          contentType: false,
          success(data) {
            insert(`${requestUrl}${data.url}`);
          },
          error() {
            console.log("服务器出错");
          }
        });
      };
      editor.create();
    },
    // 初始化用户列表
    initialUserList(onlineUserList, outlineUserList) {
      this.onlineUserList = onlineUserList
      this.outlineUserList = outlineUserList
    },
    //启动心跳检测
    heartBeat() {
      this.timer_1 = setInterval(() => {
        this.user.type = "isheartbeat"
        this.socketInRoom.send(JSON.stringify(this.user))
      }, 10000)
    },
    // 检测心跳是否正常
    checkHeartBeat() {
      this.timer_2 && clearTimeout(this.timer_2)
      this.timer_2 = setTimeout(() => {
        this.$warnMsg("连接超时")
        this.socketInRoom.close()
      }, 20000)
    },
    // 进入房间建立websocket
    connectWebsocketInRoom() {
      this.socketInRoom && (
        this.socketInRoom.close(),
        this.socketInRoom = ""
      )
      if (window.WebSocket) {
        this.socketInRoom = new WebSocket(websocketInRoomUrl)
        this.socketInRoom.onopen = e => {
          this.isonline = true
          this.user.type = "online"
          this.socketInRoom.send(JSON.stringify(this.user))
          this.heartBeat()
        }
        this.socketInRoom.onmessage = e => {
          const data = JSON.parse(e.data)
          if (data.type === 'isheartbeat') {
            this.checkHeartBeat()
          }
          if (data.type === 'getlist') {
            this.initialUserList(data.onlineUserList, data.outlineUserList)
          }
          if (data.type === 'isonline') {
            this.$router.push({ path: '/login' })
            this.$warnMsg("账号重复登录，已被踢出")
          }
        }
        this.socketInRoom.onerror = e => {
          this.$errorMsg("连接聊天系统失败")
        }
        this.socketInRoom.onclose = e => {
          this.disConnect()
        }
      } else {
        this.$warnMsg("浏览器版本过低，请切换到高版本浏览器")
      }
    },
    // 初始化监听器
    initialListener() {
      const
        viewScroll = document.querySelectorAll('.el-scrollbar__wrap')[1],
        w_e_text = document.querySelector('.w-e-text')
      viewScroll.addEventListener('scroll', e => {
        if (viewScroll.scrollTop == 0) {
          this.page++
          this.isGroup
            ? this.continueToGetGroupRecordList()
            : this.continueToGetRecordList()
        }
      })
      window.onunload = () => {
        this.socketInRoom.close()
      };
      w_e_text.addEventListener('keypress', (e) => {
        this.sendContentQuick(e.keyCode)
      })
    },
    // 初始化用户信息
    initialProfile(data) {
      for (let key in data) {
        if (key === 'avatar') {
          this.user[key] = convertHttp(data[key])
        } else {
          this.user[key] = data[key]
        }
      }
    },
    // 获取用户信息
    getUserMsg() {
      if (!this.$getMemorySes('user')) {
        this.$router.push({ path: '/login' })
        return
      }
      if (this.$isIE()) {
        this.$warnMsg("请勿使用IE浏览器运行本系统")
        this.$router.push({ path: '/login' })
        return
      }
      if(this.$isMobile()) {
        this.$warnMsg("请勿使用移动设备运行本系统")
        this.$router.push({ path: '/login' })
        return
      }
      this.$.ajax({
        url: `${requestUrl}/api/user/getusermsg?username=${this.$getMemorySes('user').username}`,
        type: "get"
      }).then(result => {
        if (result.status === 'ok') {
          this.initialProfile(result.data)
          // 进入房间建立连接
          this.connectWebsocketInRoom()
        } else {
          this.$errorMsg(result.msg)
        }
      })
    },
  },
}