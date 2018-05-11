const AV = require('../av/av-weapp-min.js');
/**
 * toast提示
 */
const showToast = function (status, msg) {
  if(status == 1){
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 3000
    });
  } else if (status == 0){
    wx.showToast({
      title: msg,
      image: '../images/fail.png'
    });
  }
  
};
/**
 * 删除图片
 */
const delImage = function (that) {
  
};

module.exports = {
  showToast,
  delImage
}