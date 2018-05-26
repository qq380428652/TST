//index.js
//获取应用实例
const AV = require('../../av/av-weapp-min.js');
// const {goods_list} = require('../../utils/util.js');
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
  // 获取精选商品列表
  getGoodsList() {
    let that = this;
    return AV.Cloud.run('getAllGoods',{choice:true}).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      that.setData({
        goods: data
      })
      return data
    }, function (err) {
      // 处理调用失败
      showToast(0, '获取失败' + err)
      return err
    });
  },
  // 获取轮播图
  getBannerList() {
    let that = this;
    let banner = [];
    let bannerKey = "swiper.banner";
    return AV.Cloud.run('getBanner').then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      for (let i in data) {
        banner[i] = data[i].url
      }
      that.setData({
        [bannerKey]: [].concat(banner)
      })
      return data
    }, function (err) {
      // 处理调用失败
      showToast(0, '获取失败' + err)
      return err
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
    this.getBannerList();

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
    let banner = this.getBannerList();
    banner.then(res => {
      let goods = this.getGoodsList();
      goods.then(res => {
        // console.log(res)
        wx.stopPullDownRefresh();

      }, err => {
        showToast(0, '获取失败' + err)
      })
    }, err => {
      showToast(0, '获取失败' + err)
    })

  }
})
