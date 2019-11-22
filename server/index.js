// 连接数据库
require('./database/connect')

// 后台框架
const express = require('express')
/*中间件*/
// 处理请求体数据
const bodyParser = require('body-parser')
// 处理url数据
const urlQuery = require('./middleware/index')
// 引入websocket处理模块
const express_ws = require('express-ws')
const app = express()

express_ws(app)

/*导入接口*/

// 用户接口
const account = require('./interface/user')
// 聊天接口
const chatRecord = require('./interface/chat_record')

/*导入websocket模块*/
const inFace = require('./socket/socketInFace')
const inGroup = require('./socket/socketInGroup')
const inRoom = require('./socket/socketInRoom')

// 允许跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  next();
});


/*用户接口*/

// 获取用户列表
app.get('/api/user/getuserlist', urlQuery.urlQuery, account.getUserList)
// 用户注册
app.post('/api/user/register', bodyParser.urlencoded({ extended: false }), account.register)
// 用户登录
app.post('/api/user/login', bodyParser.urlencoded({ extended: false }), account.login)
// 用户登出
app.get('/api/user/logout', urlQuery.urlQuery, account.logout)


/*聊天记录接口*/

// 获取聊天记录
app.get('/api/chat/getrecord', urlQuery.urlQuery, chatRecord.getRecord)
// 撤回聊天记录
app.post('/api/chat/withdrawrecord', urlQuery.urlQuery, chatRecord.withdrawRecord)
// 记录聊天记录
app.post('/api/chat/insertrecord', bodyParser.urlencoded({ extended: false }), chatRecord.insertRecord)
// 批量记录聊天记录
app.post('/api/chat/insertallrecord', bodyParser.urlencoded({ extended: false }), chatRecord.insertAllRecord)

// 一对一传输
app.ws('/inface/:uid', inFace.server)
// 一对多传输
app.ws('/inroom', inRoom.server)
app.ws('/ingroup/:uid', inGroup.server)

app.listen(8888)
