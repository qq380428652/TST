// pages/goods/goods_list.js
// const { goods_list } = require('../../utils/util.js');
const AV = require('../../av/av-weapp-min.js');
const { swiper } = require('../../utils/indexData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listStyle: 0,
    goods_list: []
  },
  changeListStyle() {
    let i = this.data.listStyle;
    if (i == 0) i = 1
    else if (i == 1) i = 0
    this.setData({
      listStyle: i
    })
  },
  search(obj){
    let that = this;
    AV.Cloud.run('getSearchGoods', obj).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      that.setData({
        goods_list: data
      })
    }, function (err) {
      // 处理调用失败
      showToast(0, '获取失败' + err)
    });
  },
  classify(obj){
    let that = this;
    AV.Cloud.run('getAllGoods', obj).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      that.setData({
        goods_list: data
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
    if (options.search){
      this.search(options);
      return
    } else if (options.type){
      options.type = JSON.parse(options.type);
    }
    console.log(options)
    this.classify(options)
    
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