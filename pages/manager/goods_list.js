// pages/manager/goods_list.js
const AV = require('../../av/av-weapp-min.js');
const { showToast } = require('../../utils/showPrompt.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    goodsList: [],
    goods: []
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    if (!e.detail.value) {
      this.setData({
        goods: this.data.goodsList
      });
      return
    }
    this.search(e.detail.value)
  },
  search(value) {
    let that = this;
    let goodsList = this.data.goodsList;
    let regExp = new RegExp(value);
    this.setData({
      goods: []
    });
    for (let i in goodsList) {
      if (regExp.test(goodsList[i].get('name')) || regExp.test(goodsList[i].get('descript'))){
        console.log(goodsList[i])
        that.setData({
          goods: that.data.goods.concat(goodsList[i])
        })
      }
    }
  },
  delGoods(e) {
    var that = this;
    wx.showModal({
      content: '确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        // console.log(res);
        if (res.confirm) {
          let objectId = e.target.dataset.id;
          let goods = AV.Object.createWithoutData('goods', objectId);
          goods.destroy().then(function (success) {
            // 删除成功
            showToast(0, '删除成功')

            let index = e.target.dataset.index;
            that.data.goods.splice(index, 1);
            that.setData({
              goods: that.data.goods
            })
          }, function (error) {
            // 删除失败
            showToast(0, '删除失败' + error)

          });
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  getGoodsList() {
    let that = this;
    let query = new AV.Query('goods');
    query.find().then(function (goods) {
      // 成功获得实例
      console.log(goods)
      that.setData({
        goodsList: goods,
        goods: goods
      })
      wx.stopPullDownRefresh()
    }, function (error) {
      // 异常处理
      console.log(error)
      showToast(0, '获取失败' + error)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
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
    this.getGoodsList();
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