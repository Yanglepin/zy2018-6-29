var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    movies: {},//轮播图
    details: {},
    publishCon: {}, //用户评论列表内容
    ImgUrl: app.data.URL,
    second_height: 0,
    // tab切换  
    currentTab: 0,
    goodsid:0
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
    let that = this;
    this.setData({
      goodsid: options.goodsid
    });
    this.getDetails(options.goodsid);  //获取图书详情
    this.getUserComment(options.goodsid); //用户评论
    // this.getPinglun(options.goodsid); //发表评论
    
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
          second_height: res.windowHeight
        })
      }
    })


  },
  //图书详情
  getDetails: function (options) {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/goodsDetail&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'id': options
      },
      success: function (res) {
        // console.log("图书详情:" + JSON.stringify(res.data))
        that.setData({
          details: res.data
        });
        that.setData({
          movies: res.data.img_temp_array
        })
          var list = res.data.description;
          if (list!=""){
            var list = list.replace(new RegExp("/upload", "g"), that.data.ImgUrl + "upload");
            WxParse.wxParse('content', 'html', list, that, 5);
           // console.log("图书简介:" + JSON.stringify(list))
          }else{
            WxParse.wxParse('content', 'html', "", that, 5);
          } 
      } 
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  }, 
  //时间戳转换时间
  toDate: function(number){
    var n= number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return(Y+M + D)
  },
  //获取用户评论内容
  getUserComment: function (options) {
    let that = this;
    // console.log("获取用户评论内容id:" + options);
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/getGoodsComments&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'goods_id': options
      },
      success: function (res) {
        //console.log("获取用户评论内容:" + JSON.stringify(res.data.data))
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].addtime = that.toDate(res.data.data[i].addtime)
          res.data.data[i].return_time = that.toDate(res.data.data[i].return_time)
        }
        that.setData({
          publishCon: res.data.data
        })
      }
    });
  },
  //评论输入事件
  PublishInput: function (event) {
    var mycomment = event.detail.value;
    this.comment = mycomment;
    this.setData({
      comment: event.detail.value,
    })
  },
  // 发布评论
  onPublish: function (event) {
    var goods_id = event.currentTarget.dataset.id;
    //console.log('goods_id='+goods_id);return;
    let that = this;
    if (that.comment == "" || that.comment == undefined) {
      wx.showToast({
        title: '请输入评论内容！',
      });
    }
    // else {
    //   wx.showToast({
    //     title: '发布成功',
    //   });
    //   }
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/order/pingJia&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        ping_content: that.comment,
        goods_id: goods_id
      },
      success: function (res) {
        console.log("发表评论:" + JSON.stringify(res))
        that.getUserComment(that.data.goodsid)
        if(res.data.code==0){
          wx.showToast({
            title: '您已评论过此书',
          });
        }
        else {
          wx.showToast({
            title: '发布成功',
          });
        }
        // that.setData({
        //   publishCon: res
        // })
      }
    });
  }
})  

