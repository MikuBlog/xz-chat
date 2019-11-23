// 上传用户头像
function uploadImage(req, res) {
  res.send({
    status: "ok",
    msg: "上传图片成功",
    url: req.body.url
  })
}

module.exports = {
  uploadImage: uploadImage
}