//app.js
const AV = require('./av/av-weapp-min.js');
var APP_ID = 'v1PjNMrBL3dxqRkzG1U5pNv7-gzGzoHsz';
var APP_KEY = 'nC8eT7skRjYcLn8SHawV5D4w';

AV.init({
  appId: "v1PjNMrBL3dxqRkzG1U5pNv7-gzGzoHsz",
  appKey: "nC8eT7skRjYcLn8SHawV5D4w"
});
App({
  onLaunch: function () {

    AV.User.loginWithWeapp().then(user => {
      this.globalData.userInfo = user.toJSON();
      console.log(user)
    }).catch(console.error);
    
  },
  globalData: {
    userInfo: null
  }
  
})