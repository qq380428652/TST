// pages/goods/goods_detail.js
const AV = require('../../av/av-weapp-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      circular: true
    },
    goods:[]
    
  },
  // 预览图片
  previewImage: function (e) {
    console.log(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.swiper.banner // 需要预览的图片http链接列表
    })
  },
  /**
     * 获取商品
     */
  getGoods(objectId) {
    let that = this;
    AV.Cloud.run('getAllGoods', { objectId: objectId }).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      that.setData({
        goods: data[0]
      })
    }, function (err) {
      // 处理调用失败
      showToast(0, '获取失败' + err)
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