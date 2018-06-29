// pages/readPh/read.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    bookList: {}, 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.navigateTo({
      url: '../index/index' 
    })
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/selectorder&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "shop_id": app.data.shop_id
      },
      success: function (res) {
        // console.log("借阅排行"+JSON.stringify(res.data))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.data
        })
      }
    })
  },
  //预借
  onBorrowSuccess: function () {
    wx.showToast({
      title: '预借成功',
    });
  },
  //收藏
  onCollectSuccess: function () {
    wx.showToast({
      title: '收藏成功',
    });
  }

})
