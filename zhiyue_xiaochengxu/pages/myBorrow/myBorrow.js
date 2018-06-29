// pages/myBorrow/myBorrow.js
var app = getApp()
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    ImgUrl: app.data.URL,
    bookList:{},
    total_now:0,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBooklist();//获取列表页
  },
  // 列表
  getBooklist: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + '/index.php?s=/api/member/jieYueLiShi&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'page_index': 1,
        'status': 2,
        'page_size': 0
      },
      success: function (res) {
       // console.log("获取列表页" + JSON.stringify(res.data))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.data,
          total_now: res.data.yi_jie,
          total: res.data.hai_jie
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onBorrowCancel: function (e) {

    var books_id = e.currentTarget.dataset.bookid;
    var borrow_id = e.currentTarget.dataset.borrow;
    wx.request({
      url: this.data.ImgUrl + '/index.php?s=/api/order/quXiaoYuJie&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'borrow_id': borrow_id,
        'books_id': books_id
      },
      success: function (res) {
        console.log('是否'+JSON.stringify(res));
          if(res.data.code>0){
              wx.showToast({
                title: '取消成功',
              });
              this.getBooklist();//获取列表页
          }else{
            wx.showToast({
              title: '取消失败',
            });
          }
      }
    })
  },
  onSkip:function(){ 
    wx.navigateTo({
      url: '../borrow/bookBorrow'
    })
  }
})