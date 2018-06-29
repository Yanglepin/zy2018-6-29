// pages/myComment/myComment.js
Page({
  data: {
    bookList: {} 
  },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      method: 'POST',
      data: {
        "key": "a20c7fdd4c724258b3579912c69ec88f",
        "info": "你会做青椒炒肉吗"
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.list
        })
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