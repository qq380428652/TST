// pages/contact/contact.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    manager:true
  },
  /**
   * 退出提示
   */
  logout() {
    wx.showModal({
      content: '确定退出？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorage({
            key: 'manager',
            success: function(res) {
              wx.switchTab({
                url: '../login/login',
              })
            },
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    userInfo.nickName = wx.getStorageSync('manager').username
    this.setData({
      userInfo: userInfo
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