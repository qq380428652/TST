// pages/classify/classify.js
const app = getApp()
const AV = require('../../av/av-weapp-min.js');
const { classify } = require('../../utils/util.js');
const { openConfirm } = require('../../utils/showPrompt.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: classify,
    activeIndex: 0,
    toNavGoods: '',
    inputShowed: false,
    inputVal: ""
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
  },
  tabClick(e) {
    console.log(e)
    this.setData({
      // toNavGoods: e.currentTarget.dataset.id,//分类商品列表锚点
      activeIndex: e.currentTarget.id
    })
  },
  // 搜索
  search(){
    wx.navigateTo({
      url: '../goods/goods_list?search=' + this.data.inputVal
    })
  },
  // 删除搜索记录
  delRecord() {
    let that = this;
    openConfirm({
      content: '确定删除吗？',
      yes: () => {
        let obj = {
          objectId: this.data.userInfo.objectId,
          searchRecord:[]
        }
        AV.Cloud.run('uploadAllGoods', obj).then(function (data) {
          // 调用成功，得到成功的应答 data
          // console.log(data)
          let searchR = "userInfo.searchRecord"
          that.setData({
            [searchR]: []
          })
          app.globalData.userInfo.searchRecord = [];
          showToast(1, '删除成功')
        }, function (err) {
          // 处理调用失败
          showToast(0, '获取失败' + err)
        });
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
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