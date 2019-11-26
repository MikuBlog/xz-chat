// 判断是否为IE浏览器
function isIE() {
  console.log(navigator.userAgent.toLowerCase().indexOf("trident"))
  return navigator.userAgent.toLowerCase().indexOf("trident") != -1
}

export default {
  isIE
}