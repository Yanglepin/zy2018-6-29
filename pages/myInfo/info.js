// pages/Info/info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    userInfo:{},
    readed: {},
    plan: {},
    myinfo: {}
  },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/myInfo&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        // 'id': options
      },
      success: function (res) {
        console.log("我的信息:" + JSON.stringify(res.data))
        that.setData({
          myinfo: res.data
        });
      }
    })
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