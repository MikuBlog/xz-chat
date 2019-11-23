//引入url,用于分析传入url后的参数
const url = require('url')
//引入文件解析模块
var multer = require('multer')
//配置图片中间件
const RamImage_1 = multer.diskStorage({
  destination: function (req, file, callback) {
    //第二个参数设置路径，下面的路径为server.js所在目录的相对路径
    callback(null, __dirname + '/../source/images/avatar')
  },
  filename: function (req, file, callback) {
    //第二个参数设置文件名，下面的文件名为上传时的文件名
    req.body.url = `/source/images/avatar/${new Date().getTime()}.jpg`
    callback(null, `${new Date().getTime()}.jpg`)
  }
})

const RamImage_2 = multer.diskStorage({
  destination: function (req, file, callback) {
    //第二个参数设置路径，下面的路径为server.js所在目录的相对路径
    callback(null, __dirname + '/../source/images/chat')
  },
  filename: function (req, file, callback) {
    //第二个参数设置文件名，下面的文件名为上传时的文件名
    req.body.url = `/source/images/chat/${new Date().getTime()}.jpg`
    callback(null, `${new Date().getTime()}.jpg`)
  }
})

/**
 * @author xuanzai
 * @description 获取url后的参数
 * @param { url } 传入的url，默认为空
 * @returns { Object }
 */
function urlQuery(req, res, next) {
  let myUrl = url.parse(req.url).query
  req.urlQuery = {}
  if (myUrl) {
    myUrl.split("&").forEach(val => {
      const
        key = val.split("=")[0],
        value = val.split("=")[1]
      req.urlQuery[key] = decodeURIComponent(value)
    })
  }
  next()
}

module.exports = {
  urlQuery: urlQuery,
  editAvatar: multer({ storage: RamImage_1 }),
  uploadImage: multer({ storage: RamImage_2 })
}
