//index.js
//获取应用实例
const app = getApp()
const AV = require('../../av/av-weapp-min.js');
let { swiper } = require("../../utils/indexData.js");
Page({
  data: {
    swiper: {
      banner: [],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      circular: true
    },
    search: {
      inputVal: "",
      types: ["红酒", "保湿"],
      typeIndex: 0,
    },
    goodsList: [],
    goods: []
  },
  //事件处理函数
  //清楚输入内容
  clearInput: function () {
    let inputVal = "search.inputVal";
    this.setData({
      [inputVal]: ""
    });
    this.setData({
      goods: this.data.goodsList
    });
  },
  //输入搜索
  inputSearch: function (e) {
    let inputVal = "search.inputVal";
    this.setData({
      [inputVal]: e.detail.value
    });
    if (!e.detail.value) {
      this.setData({
        goods: this.data.goodsList
      });
      return
    }
    this.search(e.detail.value, this.data.search.typeIndex)
  },
  //选择类型搜索
  bindtypeChange: function (e) {
    console.log("picker type 发生选择改变，携带值为", e.detail.value);
    let typeIndex = "search.typeIndex";
    this.setData({
      [typeIndex]: e.detail.value
    })
    if (!this.data.search.inputVal) {
      this.setData({
        goods: this.data.goodsList
      });
      return
    }
    this.search(this.data.search.inputVal, e.detail.value)
  },
  // 搜索
  search(value, tp) {
    let that = this;
    let goodsList = this.data.goodsList;
    let regExp = new RegExp(value);
    this.setData({
      goods: []
    });

    for (let i in goodsList) {
      if (regExp.test(goodsList[i].get(tp)) && (regExp.test(goodsList[i].get('name')) || regExp.test(goodsList[i].get('descript')))) {
        console.log(goodsList[i])
        that.setData({
          goods: that.data.goods.concat(goodsList[i])
        })
      }
    }
  },
  // 预览图片
  previewImage: function (e) {
    console.log(e.currentTarget.id)
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.swiper.banner // 需要预览的图片http链接列表
    })
  },
  // 获取商品列表
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
    }, function (error) {
      // 异常处理
      console.log(error)
      showToast(0, '获取失败' + error)
    });
  },
  // 获取轮播图
  getBannerList() {
    let that = this;
    let bannerKey = "swiper.banner";
    let query = new AV.Query('banner');
    query.find().then(function (banner) {
      // 成功获得实例
      console.log(banner)
      for (let i in banner) {
        banner[i] = banner[i].get('url')
      }
      that.setData({
        [bannerKey]: [].concat(banner)
      })
    }, function (error) {
      // 异常处理
      console.log(error)
      showToast(0, '获取失败' + error)
    });
  },
  getUserInfo(){
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
    this.getBannerList();

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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'TST商品',
      path: '/page/user',
      imageUrl: '../images/share-img.jpg',
      success: function (res) {
        console.log(res)
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function () {
    this.getGoodsList();
    this.getBannerList();
    wx.stopPullDownRefresh()
  }
})
