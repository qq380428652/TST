// pages/login/login.js
const AV = require('../../av/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCenterTips: false,
    status: 0,
    msgTip: '',
    user: '',
    psw: '',
    verCode: ''
  },
  userChange(e) {
    this.setData({
      user: e.detail.value
    })
  },
  pswChange(e) {
    this.setData({
      psw: e.detail.value
    })
  },
  verCodeChange(e) {
    this.setData({
      verCode: e.detail.value
    })
  },
  /**
   * 验证提示弹框
   */
  showTips: function (status, msgTip, url) {
    clearTimeout(timer);
    let that = this;
    this.setData({
      showTopTips: true,
      status,
      msgTip
    });
    let timer = setTimeout(function () {
      if (url) {
        wx.redirectTo({
          url: url
        })
      };
      that.setData({
        showTopTips: false,
      });
    }, 3000);
  },
  /**
   * 管理登录
   */
  login(e) {
    let that = this;
    if (!that.data.user || !that.data.psw) {
      that.showTips(0, '账号或密码不能为空');
      return
    };
    let query = new AV.Query('manager');
    query.contains('username', that.data.user);
    query.first().then((manager) => {
      if (manager) {  //账号是否存在
        console.log(manager)
        let password = manager.get('password');
        if (that.data.psw == password) {  //密码是否正确
          wx.setStorage({ //本地存储
            key: "manager",
            data: manager
          });
          that.showTips(1, '登陆成功', '../manager/manager');
        } else {
          that.showTips(0, '主人密码错了');
        }
      } else {
        that.showTips(0, '你不是我的主人');
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    wx.getStorage({ //获取管理员是否登录过
      key: 'manager',
      success: function (res) {
        // console.log(res)
        if (!res.data) return
        wx.redirectTo({
          url: '../manager/manager',
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
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