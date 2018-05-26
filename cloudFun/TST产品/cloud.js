var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function (request) {
  return 'Hello world!';
});

/**
 * 获取商品列表
 */
AV.Cloud.define('getAllGoods', function (request) {
  let query = new AV.Query('goods');
  if (request.params) {
    for (let item in request.params) {
      query.equalTo(item, request.params[item]);
      console.log(request.params[item], item)

    }
  }
  return query.find().then(function (goods) {
    // 成功获得实例
    return goods
  }, function (error) {
    // 异常处理
    return '获取失败' + error
  });
});
/**
 * 更新商品列表
 */
AV.Cloud.define('uploadAllGoods', function (request) {
  let query = new AV.Query('_User');
  query.get(request.params.objectId).then((goods) => {
    for (let item in request.params) {
      if (item != 'objectId') {
        goods.set(item, request.params[item]);
        console.log(request.params[item], item)
      }
    }
    goods.save();
  })

});
/**
 * 获取首页轮播图列表
 */
AV.Cloud.define('getBanner', function (request) {
  let query = new AV.Query('banner');
  return query.find().then(function (banner) {
    // 成功获得实例
    return banner
  }, function (error) {
    // 异常处理
    return '获取失败' + error
  });
});

/**
 * 获取搜索商品
 */
AV.Cloud.define('getSearchGoods', function (request) {
  let query1 = new AV.Query('goods');
  let query2 = new AV.Query('goods');
  let query3 = new AV.Query('goods');
  query1.contains('name', request.params.search);
  query2.contains('descript', request.params.search);
  query3.contains('detail', request.params.search);

  let query = AV.Query.or(query1, query2, query3);
  return query.find().then(function (goods) {
    // 成功获得实例
    return goods
  }, function (error) {
    // 异常处理
    return '获取失败' + error
  });
});
