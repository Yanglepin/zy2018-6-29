//获取应用实例  
var app = getApp()
Page({
  data: {
    ImgUrl: app.data.URL,
    bookBorrow: {},
    borrowHistory: {},
    searchKeyword: '', //需要搜索的字符 
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: ''
  },
  onLoad: function (options) {
    let that = this;
    this.onBorrowing();
    this.onBorrowHistory();
    this.setData({
      currentTab: options.currentTab
    })
    // console.log("22222"+options.currentTab);
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  //点击图片查看详情
  goinfo: function (e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../details/details?goodsid=' + goodsid
    })
  },
  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function (e) {
    console.log("输入框事件" + e.detail.value)
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  //点击搜索按钮，触发事件 
  keywordSearch: function () {
    //console.log(this.data.searchKeyword)
    // this.data.searchPageNum = 1;
    this.onBorrowHistory();
  },
  onBorrowing: function(){
    var that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/jieYueLiShi&SSID=' + wx.getStorageSync("ssid"), 
      method: 'POST',
      data: {
        status: 1,
        page_index: 1
      },
      success: function (res) {
        // console.log("借阅中" + JSON.stringify(res.data.data))
        that.setData({
          bookBorrow: res.data.data
        })
      }
    });
  },
  onBorrowHistory: function () {
    var that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/jieYueLiShi&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        status: 3,
        page_index: 1,
        search: that.data.searchKeyword
      },
      success: function (res) {
         //console.log("借阅历史" + JSON.stringify(res.data.data))
        that.setData({
          borrowHistory: res.data.data
        })
      }
    });
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
    // console.log("00000000000"+this.data.currentTab);
    
  },
  navigateBack: function () {
    var self = this;
    var pages = getCurrentPages();
    if (pages.length == 1) {
      if (self.data.circleId && self.data.circleId > 0) {
        wx.redirectTo({
          url: '../index/index?circleId=' + self.data.circleId
          + '&circleName=' + (self.data.circleName || '')
        });
      } else {
        wx.switchTab({
          url: "../Member/myInfo"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }
  
})  