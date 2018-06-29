var app = getApp(); 
Page({ 
  data: {
    movies: {},
    dtCon: {}, //馆内公告
    personalRead: {}, //个人阅读数据
    monthRead: {}, //月度阅读排行榜
    ImgUrl: app.data.URL
  },
  //事件处理函数
  bindRead: function () { 
    wx.navigateTo({
      url: '../readPh/read' //借阅排行
    })
  },
  bindNew: function () {
    wx.navigateTo({
      url: '../newSj/new' //最新上架
    })
  },

  onLoad: function (options) {
    this.getBanner();//馆内轮播
    this.getDtCon();  //馆内公告
    this.getPersonalRead();  //获取个人阅读数据
    this.getMonthRead();  //获取月度阅读排行榜
  },
  // 获取首页轮播图
  getBanner: function () {
    let that = this;
    console.log(wx.getStorageSync("ssid"));
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/index&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
    
      },
      success: function (res) {
        //console.log("获取首页轮播图" + JSON.stringify(res));return;
        // console.log("data:" + res.data)
        that.setData({
          movies: res.data.data
        })
      }
    })
  },
  // 获取馆内公告
  getDtCon: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/noticelist&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "shop_id": app.data.shop_id
      },
      success: function (res) {
        //console.log("获取馆内公告" +JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          dtCon: res.data.data
        })
      }
    })
  },
  // 获取个人阅读数据
  getPersonalRead: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/tongjishopcount&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "shop_id": app.data.shop_id
      },
      success: function (res) {
        //console.log("88888"+JSON.stringify(res.data));
        // console.log("data:" + res.data)
        that.setData({
          personalRead: res.data
        })
      }
    })
  },
  // 获取月度阅读排行榜
  getMonthRead: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/bookdesc&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "shop_id": app.data.shop_id
      },
      success: function (res) {
      //  console.log("月度阅读排行榜" + JSON.stringify(res.data));
        // console.log("data:" + res.data)
        that.setData({
          monthRead: res.data
        })
      }
    })
  }

})    