// pages/myCollect/myCollect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: {}, 
    neirong:""
    // bookList: [{
    //   icon: '../../icons/book.png',
    //   listTitle: '小小科学家，困厄于名缰利锁，自然面目可憎，焉能语言有味?决心的起点，蹉跎的终点，与心灵对话',
    //   age: '8-10岁',
    //   sort: '实验百科',
    //   bookNum: 'A-24',
    //   isTrue: '是',
    //   yuBorrow: '+预借',
    //   collect: '-收藏'
    // }]
  },
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://www.tuling123.com/openapi/api',
      method: 'POST',
      data: {
        "key": "a20c7fdd4c724258b3579912c69ec88f",
        "info": "你会做青椒炒肉吗"
      },
      success: function (res) {
        console.log(JSON.stringify(res))
        // console.log("data:" + res.data)
        that.setData({
          bookList: res.data.list
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
          url: "../Member/myInfo"
        });
      }
    } else {
      wx.navigateBack({ changed: true });//返回上一页  
    }
  },
  //预借
  onBorrowSuccess: function () {
    // wx.switchTab({
    //   url: '../myBorrow/myBorrow'
    // });
    wx.showToast({
      title: '预借成功',
    });
  },
  //收藏
  onCollectCancel: function () {
    wx.showToast({
      title: '取消收藏',
    });
  }
})