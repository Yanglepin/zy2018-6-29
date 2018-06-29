// pages/myCollect/myCollect.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    bookList: {}
  },
  onLoad: function (options) { 
    this.getDetails();
  },
  //我的收藏列表
  getDetails: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/myCollection&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'page_index': 1
      },
      success: function (res) {
        console.log("我的收藏列表:" + JSON.stringify(res))
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
  },
  //预借
  onBorrowSuccess: function (e) {
    let that = this;
    var goods_id1 = e.currentTarget.dataset.id;
    //console.log(goods_id1);return;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/yuJieBook&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        book_id: goods_id1
      },
      success: function (res) {
        if (res.data.code > 0) {
          wx.showToast({
            title: '预借成功',
            icon: 'none'
          });
          that.getDetails();//获取列表页
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  },
  //收藏
  onCollectCancel: function (e) {
    let that = this;
    var goods_id1 = e.currentTarget.dataset.id;
    wx.request({
      url: this.data.ImgUrl + '/index.php?s=/api/member/cancelFavorites&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        goods_id: goods_id1
      },
      success: function (res) {
        if (res.data.code > 0) {
          wx.showToast({
            title: '取消成功',
          });
          that.getDetails();//获取列表页
        } else {
          wx.showToast({
            title: '取消失败',
          });
        }
      }
    })
  }
})