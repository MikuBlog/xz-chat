export default {
  data() {
    return {
      user: {},
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
      isonline: false,
      isGroup: false,
      src: "https://myinterface.xuanzai.top/getPicture?type=头像&id=1",
      textarea: "",
      ExistingContentList: [],
      willSendContentList: [],
      onlineUserList: [],
      outlineUserList: [],
      recordList: []
    }
  }
}