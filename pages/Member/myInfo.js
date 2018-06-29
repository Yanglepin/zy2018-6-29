// pages/info/myInfo.js
var app = getApp();
Page({
  data: {
    ImgUrl: app.data.URL,
    userInfo: {},
    memberIndex: {}
 },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/index&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
      },
      success: function (res) {
        // console.log("个人中心"+JSON.stringify(res))
        that.setData({
          memberIndex: res.data.data,
        })
      }
    });
    app.getUserInfo(function (userInfo) { 
      console.log(JSON.stringify(userInfo))
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  //预借跳转
  onMyborrow: function () {
    wx.switchTab({
      url: '../myBorrow/myBorrow',
    })
  }
})