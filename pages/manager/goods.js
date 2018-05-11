// pages/manager/goods.js
const AV = require('../../av/av-weapp-min.js');
const { showToast } = require('../../utils/showPrompt.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: '',
    fileLimite: 1,
    files: [],
    name: '',
    descript: '',
    content: '',
    operate: '添加'
  },
  nameChange(e) {
    this.setData({
      name: e.detail.value
    })
  },
  descriptChange(e) {
    this.setData({
      descript: e.detail.value
    })
  },
  contentChange(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
  * 上传图片
  */
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length >= that.data.fileLimite) return that.limitImageTip();
    wx.chooseImage({
      count: 1,  //同时上传的个数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        let filePath = res.tempFilePaths[0];
        let file = new AV.File('goods', {
          blob: { uri: filePath }
        });
        file.save().then(function (file) {
          // 文件保存成功
          console.log(file);
          showToast(1, '上传成功');
          that.setData({
            files: that.data.files.concat(file)
          })
        }, function (error) {
          // 异常处理
          console.error(error);
          showToast(0, '上传失败');

        });
      },
      fail: function (error) {
        console.log(error)
        // showToast(0, '取消上传');

      }
    })
  },
  /**
    * 限制上传图片提示
    */
  limitImageTip() {
    var that = this;
    that.setData({
      showTopTips: true,
      msgTip: '上传图片量已超出限制'
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false,
      });
    }, 3000);
  },
  /**
  * 删除图片
  */
  delImage(e) {
    // console.log(e)
    var that = this;
    wx.showModal({
      content: '确定删除？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        // console.log(res);
        if (res.confirm) {
          console.log('用户点击确定');

          wx.showLoading({
            title: '删除中...'
          })
          let fileId = that.data.files[0].get('objectId');
          let file = AV.File.createWithoutData(fileId);
          file.destroy().then(() => {
            showToast(1, '删除成功');

            that.setData({
              files: []
            });
          }, () => {
            showToast(0, '删除失败');

          });

        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submit() {
    console.log(this.data)
    var that = this;
    if (!that.data.name) return showToast(0, '请填写产品名');
    if (!that.data.files.length) return showToast(0, '请上传产品封面');

    let goods = new AV.Object('goods');
    goods.set('imgUrl', that.data.files[0].url());
    goods.set('file', that.data.files[0]);
    goods.set('name', that.data.name);
    goods.set('descript', that.data.descript);
    goods.set('content', that.data.content);
    goods.save().then(function (goods) {
      // 文件保存成功
      console.log(goods);
      wx.navigateTo({
        url: 'msg_success?operate=' + that.data.operate + '&msg=' + goods
      })

    }, function (error) {
      // 异常处理
      console.error(error);
      wx.navigateTo({
        url: 'msg_fail?operate=' + that.data.operate + '&msg=' + error
      })

    });


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
    console.log(options);
    // 获取商品
    if (!options.objectId) return
    this.setData({
      operate: '修改'
    })
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