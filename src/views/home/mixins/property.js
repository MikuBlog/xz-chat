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
      startTime: new Date().getTime(),
      endTime: new Date().getTime(),
      timer_1: "",
      timer_2: "",
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