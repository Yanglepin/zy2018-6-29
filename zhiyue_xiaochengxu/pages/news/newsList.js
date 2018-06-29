//获取应用实例  
var app = getApp();
var page = 0;
Page({
  data: {
    bookList:{}, //图书知识
    zxList: {},  //知阅资讯
    ImgUrl: app.data.URL,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    page:1
  },
  //事件处理函数
  bindSkip: function (e) {
    //debugger;
    var article_id = e.currentTarget.dataset.id;   //点击跳转获取对应的id
    wx.navigateTo({
      url: '../information/information?id=' + article_id //新闻详情
    })
  },
  onLoad: function () {
    page = 1;
    this.getBookZs();//图书知识
    this.getZhiyueZx();//知阅资讯
  },
  onReachBottom:function(){
   //下拉加载
  



  },

  // 获取图书知识
  getBookZs: function () {
    let that = this;
    // wx.showLoading({
    //   title: '玩命加载中',
    // });
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/article/articleList&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "id": 5,
        'page_index': page,
        'page_size':10
      },
      success: function (res) {
        //console.log("获取图书知识" + JSON.stringify(res.data))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.data
        })
      }
    })
  },

  // 获取知阅资讯
  getZhiyueZx: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/article/articleList&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "id": 6
      },
      success: function (res) {
        //console.log("获取知阅资讯" + JSON.stringify(res.data))
        // console.log("data:" + res.data)
       
        that.setData({
          zxList: res.data.data
        })
      }
    })
  },
  
  /** 
     * 滑动切换tab  
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  