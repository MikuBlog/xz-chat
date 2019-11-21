//引入url,用于分析传入url后的参数
const url = require('url')
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
  urlQuery: urlQuery
}
