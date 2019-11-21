export default {
  data() {
    return {
      user: {},
      chatObj: {},
      socketInFace: "",
      socketInGroup: "",
      socketInRoom: "",
      page: 1,
      size: 10,
      loading: false,
      getRecordLoading: false,
      src: "https://myinterface.xuanzai.top/getPicture?type=头像&id=1",
      textarea: "",
      ExistingContentList: [],
      willSendContentList: [],
      userList: [],
      recordList: []
    }
  }
}