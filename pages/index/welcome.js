// pages/index/welcome.js
const AV = require('../../av/av-weapp-min.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true
  },
  bindgetuserinfo({ detail }) {
    const user = AV.User.current();
    user.set(detail.userInfo).save().then(user => {
      // 成功，此时可在控制台中看到更新后的用户信息  
      app.globalData.userInfo = user.toJSON();
      wx.navigateTo({
        url: 'guide',
      })
    }).catch(console.error);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            show:false
          });
          setTimeout(() => {
            wx.switchTab({
              url: 'index',
            })
          }, 1000)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})