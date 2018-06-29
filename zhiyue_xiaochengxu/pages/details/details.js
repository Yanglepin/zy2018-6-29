var app = getApp()
Page({
  data: {
    movies: {},
    details: {},
    publishCon: {}, //评论内容
    ImgUrl: app.data.URL,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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
          url: "../borrow/bookBorrow"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  },
  onLoad: function (options) {
    this.getPublish();   //发布评论
    this.getDetails();    //图书详情
  },
  //图书详情
  getDetails: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/goodsDetail&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        
      },
      success: function (res) {
        console.log("图书详情:" +JSON.stringify(res.data))
        // console.log("data:" + res.data)
        that.setData({
          details: res.data
        })
      }
    })
  },

  getPublish: function () {
    let that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      method: 'POST',
      data: {
        "key": "6b72a5713a8f40d484a1d62f474e22fd",
        "info": "玉米"
      },
      success: function (res) {
        that.setData({
          publishCon: res
        })
      }
    });
  },
  //评论输入事件
  PublishInput: function (event) {
    var mycomment = event.detail.value
    this.comment = mycomment
    this.setData({
      comment: event.detail.value,
    })
  },
  // 发布评论
  onPublish: function (event) {
    let that = this;
    console.log("comment111" + this.comment);
    if (that.comment == "" || this.comment == undefined) {
      wx.showToast({
        title: '请输入评论内容！',
      });
    }
    else {
      wx.showToast({
        title: '发布成功',
      });
    }
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      method: 'POST',
      data: {
        "key": "6b72a5713a8f40d484a1d62f474e22fd",
        "info": "玉米"
      },
      success: function (res) {
        that.setData({
          publishCon: res
        })
      }
    });
  }

  

})  

