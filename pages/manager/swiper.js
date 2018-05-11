// pages/manager/swiper.js
const AV = require('../../av/av-weapp-min.js');
const { showToast } = require('../../utils/showPrompt.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    fileLimite: 5,
    showTopTips: false,
    msgTip: ''
  },
  /**
  * 添加上传图片
  */
  chooseImage: function (e) {
    var that = this;
    if (that.data.files.length >= that.data.fileLimite) return that.limitImageTip()
    wx.chooseImage({
      count: 5,  //同时上传的个数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        if (that.data.files.length + res.tempFilePaths.length > that.data.fileLimite) return that.limitImageTip();  //限制上传个数判断

        // 上传保存到服务器
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let tempFilePath = res.tempFilePaths[i];
          let file = new AV.File('banner', {
            blob: { uri: tempFilePath }
          });
          file.save().then(function (file) {
            // 文件保存成功
            console.log(file);
            showToast(1, '上传成功');

            let banner = new AV.Object('banner');
            banner.set('url', file.url());
            banner.set('file', file)
            banner.save().then(function (banner) {
              // 文件保存成功
              console.log(banner);
              showToast(1, '保存成功');
              that.setData({
                files: that.data.files.concat(banner)
              });
            }, function (error) {
              // 异常处理
              console.error(error);
              showToast(0, '保存失败');

            });
          }, function (error) {
            // 异常处理
            console.error(error);
            showToast(0, '上传失败');

          });

        }

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
          let index = e.target.dataset.index;
          let imgUrl = that.data.files[index].get('url');
          let bannerId = that.data.files[index].get('objectId');
          let fileId = that.data.files[index].get('file').get('objectId');
          let banner = AV.Object.createWithoutData('banner', bannerId);
          banner.destroy().then((res) => {
            showToast(1, '删除成功');

            that.data.files.splice(index, 1);
            that.setData({
              files: that.data.files
            });
          }, () => {
            showToast(0, '删除失败');

          });
          let file = AV.File.createWithoutData(fileId);
          file.destroy();


        } else {
          console.log('用户点击取消')
        }
      }
    });
  },

  /**
   * 浏览图片
   */
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  /**
   * 上传图片状态
   */
  openToast: function () {
    wx.showToast({
      title: '已完成',
      icon: 'success'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let query = new AV.Query('banner');
    query.find().then((res) => {  //获取所有的banner图片
      console.log(res)
      that.setData({
        files: res
      });
    }, (error) => {
      console.log(error)
    });
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

})