// pages/newSj/new.js
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
    // console.log("ttttt" + that.data.ImgUrl);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/index/newbook&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        "shop_id": app.data.shop_id
      },
      success: function (res) {
        // console.log(JSON.stringify(res.data))
        // console.log("data:" + res.data)
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
  onCollectSuccess: function (e) {
    let that = this;
    var goods_id1 = e.currentTarget.dataset.id;
    //console.log(goods_id1);return;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/FavoritesGoodsorshop&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        goods_id: goods_id1
      },
      success: function (res) {
        if (res.data.code > 0) {
          wx.showToast({
            title: '收藏成功',
            icon: 'none'
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  }

})
