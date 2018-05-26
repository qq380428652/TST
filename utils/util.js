// 测试数据
// 分类
const classify = [
  {
    name: '红酒',
    child: [
      { name: '法国蓝带', img: '../images/vcode.jpg' }
    ]
  }, {
    name: '红酒红酒',
    child: [
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' }
    ]
  }, {
    name: '红酒红酒',
    child: [
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' }
    ]
  }, {
    name: '红酒红酒',
    child: [
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' },
      { name: '法国蓝带', img: '../images/vcode.jpg' }
    ]
  }
]
//商品列表
const goods_list = [
  {
    name: '法国蓝带', coverImg: '../images/vcode.jpg', img: '../images/vcode.jpg', descript: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', detail: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', objectId: 'sdaadd'
  },
  {
    name: '法国蓝带', coverImg: '../images/vcode.jpg', img: '../images/vcode.jpg', descript: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', detail: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', objectId: 'sdaadd2'
  },
  {
    name: '法国蓝带', coverImg: '../images/vcode.jpg', img: '../images/vcode.jpg', descript: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', detail: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。', objectId: 'sdaadd3'
  }
]

module.exports = {
  classify,
  goods_list
}
