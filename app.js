//app.js
App({
  data:{
    openId: "",
    shop_id: 0,
    logincode:0,
    // book_id: 5,  //新闻中心-图书知识
    // zixun_id: 6, //新闻中心-知阅资讯
    URL:"https://zhiyue.xieenguoji.com/",
    PHPSESSID:'',
    brand : '',
    th:'',
    age:'',
    win:''
  }, 
  onLaunch: function () {
    //调用API从本地缓存中获取数据
   // console.log("1111111"+this.data.URL);
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    if (!wx.getStorageSync("ssid")){
      wx.navigateTo({
        url: '../pages/login/login'
      })
    }
    if (this.data.logincode<1){
      wx.navigateTo({
        url: '../pages/login/login'
      })
    }else{
      wx.switchTab({
        url: '../index/index',
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          that.openId="";
          //console.log("0000000000000"+res.code);
        }
      })

      wx.getUserInfo({
        success: function (res) {
         // console.log('app2' + res)
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  }


//   showModel:function(){
//   wx.showToast({
//   title: '正在加载....',
//   icon: 'loading',
//   duration: 5000
// })
//   },
//   globalData:{
//     url:"https://demo.jeecms.com/api",
//     userInfo:null,
//     appId:"4505818634615678",
//     appKey:"2sHKEWFCxNofq1EbwusziayFJlIfRJ8o",
//     aesKey:"iQigEt6Hg4cjnns7",
//     ivKey:"3V3OVwQwxdIaxrx1"
//   },
 
  
})


