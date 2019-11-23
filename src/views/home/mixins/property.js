export default {
  data() {
    return {
      user: {
        avatar: "",
        username: "",
        name: "",
        email: "",
        phone: "",
        age: ""
      },
      chatObj: {},
      socketInFace: "",
      socketInGroup: "",
      socketInRoom: "",
      beginTime: 0,
      differTime: 0,
      page: 1,
      size: 10,
      loading: false,
      getRecordLoading: false,
      withdrawLoading: false,
      isonline: false,
      isGroup: false,
      sendTime: "",
      widthdrawSender: "",
      src: "http://myinterface.xuanzai.top/getPicture?type=头像&id=1",
      textarea: "",
      ExistingContentList: [],
      willSendContentList: [],
      onlineUserList: [],
      outlineUserList: [],
      recordList: []
    }
  }
}