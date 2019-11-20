// 连接数据库
require('./database/connect')

// 后台框架
const express = require('express')
// 处理请求体数据
const bodyParser = require('body-parser')
const app = express()

/*导入接口*/


// 允许跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  next();
});

// 用户注册

// 用户登录