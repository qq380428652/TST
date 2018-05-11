// pages/goods/goods_detail.js
const AV = require('../../av/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
     * 获取商品
     */
  getGoods(objectId) {
    let that = this;
    let query = new AV.Query('goods');
    query.get(objectId).then(function (goods) {
      // 成功获得实例
      that.setData({
        name: goods.get('name'),
        descript: goods.get('descript'),
        content: goods.get('content'),
        files: [goods.get('file')],
      })
    }, function (error) {
      // 异常处理
      showToast(0, '商品获取失败');
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods(options.objectId);
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