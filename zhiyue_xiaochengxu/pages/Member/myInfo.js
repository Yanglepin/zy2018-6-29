// pages/info/myInfo.js
var app = getApp();
Page({
  data: {
    userInfo: {},
    memberJy: {},
    memberYj: {},
    memberPl: {},
    memberSc: {}
 },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      method: 'POST',
      data: {
        "key": "a20c7fdd4c724258b3579912c69ec88f",
        "info": "讲个笑话"
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          memberJy: res.data,
          memberYj: res.data,
          memberPl: res.data,
          memberSc: res.data
        })
      }
    })
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