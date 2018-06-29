//获取应用实例  
var app = getApp()
Page({
  data: {
    bookList: {},
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function (options) {
    this.onBorrowing();
    this.onBorrowHistory();

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
  onBorrowing: function(){
    var that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      data: {
        "key": "a20c7fdd4c724258b3579912c69ec88f",
        "info": "炒鸡蛋怎么做"
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.list
        })
      }
    });
  },
  onBorrowHistory: function () {
    var that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      data: {
        "key": "a20c7fdd4c724258b3579912c69ec88f",
        "info": "炒鸡蛋怎么做"
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.list
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