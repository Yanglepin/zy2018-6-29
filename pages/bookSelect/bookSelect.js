// pages/bookSelect/bookSelect.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookSelect: {},
    themeList:{},
    barndList:{},
    prizeList:{},
    ImgUrl: app.data.URL,
    ffff:'',
    key1:'',
    key2: '',
    key3: '',
    key4: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookSelect();
  },
  // 获取数据
  getBookSelect: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/getShaiClass&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {

      },
      success: function (res) {
        // console.log(res.data.age);
  
        that.setData({
          bookSelect: res.data.age,
          brandList:res.data.brand,
          prizeList:res.data.jiang,
          themeList:res.data.theme
        });
      }
    })
  },

  navigateBack: function () {
    var self = this;
    // console.log(self.data.key1);
    // console.log(self.data.key2);
    // console.log(self.data.key3);
    // console.log(self.data.key4);
    app.globalData.brand = self.data.key3;
    app.globalData.th = self.data.key2;
    app.globalData.age = self.data.key1;
    app.globalData.win = self.data.key4;
    wx.switchTab({
      url: '../borrow/bookBorrow',
    })
  },
  ageTap:function(e){
    var data_id = e.currentTarget.dataset.id;  
     this.setData({
       ffff:"active",
       key1:data_id
     });
  },
  themeTap:function(e){
    var data_id = e.currentTarget.dataset.id;
    this.setData({
      ffff: "active",
      key2: data_id
    });
  },
  brandTap: function (e) {
    var data_id = e.currentTarget.dataset.id;
    this.setData({
      ffff: "active",
      key3: data_id
    });
  },
  prizeTap: function (e) {
    var data_id = e.currentTarget.dataset.id;
    this.setData({
      ffff: "active",
      key4: data_id
    });
  },
  navQuXiao:function(){
    //取消选中状态
    this.setData({
      key1: '',
      key2: '',
      key3: '',
      key4: ''
    });
    // app.globalData.brand = '';
    // app.globalData.th = '';
    // app.globalData.age = '';
    // app.globalData.win = '';
    // wx.switchTab({
    //   url: '../borrow/bookBorrow',
    // })
  }


})