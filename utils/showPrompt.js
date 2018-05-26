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
 * confirm询问提示
 * param obj.title Object
 */
const openConfirm = function (obj) {
  wx.showModal({
    title: obj.title||'',
    content: obj.content || '',
    confirmText: "确认",
    cancelText: "取消",
    success: function (res) {
      console.log(res);
      if (res.confirm) {
        if (obj.yes) obj.yes();
        console.log('用户点击主操作')
      } else {
        if (obj.no) obj.no();
        console.log('用户点击辅助操作')
      }
    }
  });
};
/**
 * Alert提示
 * param content String
 * param yes Function
 */
const openAlert = function (content,yes) {
  wx.showModal({
    content: content || '',
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        if (yes) yes();
        console.log('用户点击确定')
      }
    }
  });
}

module.exports = {
  showToast,
  openConfirm,
  openAlert
}