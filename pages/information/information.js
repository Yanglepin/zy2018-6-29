// pages/information/information.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    ImgUrl: app.data.URL,
    article: {},
    bookList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getBookXq(e.id);//获取图书知识详情
  },
  // 获取图书知识详情
  getBookXq: function (e) {
    let that = this; 
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/article/showArticle&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        // data.article_content = HTMLDecode(data.article_content).replace(/\/upload\//g, url + "upload/");
        "id": e
      },
      success: function (res) {
        var list = res.data.data.content;
        WxParse.wxParse('content', 'html', list, that, 5);
        //console.log(content);
        that.setData({
           article: res.data.data
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
          url: "../news/newsList"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  }
})