// pages/myComment/myComment.js
var app = getApp()
Page({
  data: {
    ImgUrl: app.data.URL,
    bookList: {} 
  },
  onLoad: function () {
    this.getDetails();
  },
  //时间戳转换时间
  toDate: function (number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },
  //我的评论详情
  getDetails: function () {
    let that = this; 
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/woDePingLun&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'page_index': 1
      },
      success: function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].addtime = that.toDate(res.data.data[i].addtime)
        }
        // console.log("我的评论详情:" + JSON.stringify(res.data.data))
        that.setData({
          bookList: res.data.data
        })
      }
    })
  },
  //点击图片查看详情
  goinfo: function (e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../details/details?goodsid=' + goodsid
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