
var app = getApp();
Page({
  data: {
    ImgUrl: app.data.URL,
    bookList: {},
    searchKeyword: '', //需要搜索的字符 
    searchSongList: [], //放置返回数据的数组 
    isFromSearch: true, // 用于判断searchSongList数组是不是空数组，默认true，空的数组 
    searchPageNum: 1, // 设置加载的第几次，默认是第一次 
    callbackcount: 40,  //返回数据的个数 
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏 
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
    brand_id:'',
    theme:'',
    read_age:'',
    win_prize:'',
    page_count: 0,
    newsPanelHeight:360,
    classicArr: [
      {
        img: "../../icons/read.png",
      }
    ],
  },
  errImg: function (e) {
    var _errImg = e.target.dataset.errImg;
    var _objImg = "'" + _errImg + "'";
    var _errObj = {};
    _errObj[_errImg] = "../../icons/read.png";
    console.log(e.detail.errMsg + "----" + _errObj[_errImg] + "----" + _objImg);
    this.setData(_errObj);//注意这里的赋值方式...
  },

  
  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function (e) {
   // console.log("输入框事件" + e.detail.value)
    this.setData({
      searchKeyword: e.detail.value
    })
  },
  //点击图片查看详情
  goinfo: function (e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../details/details?goodsid=' + goodsid
    })
  },
  //点击搜索按钮，触发事件 
  keywordSearch: function () {
    this.data.searchPageNum = 1;
    this.getBooklist();
  },
  //滚动到底部触发事件 
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1 
        isFromSearch: false //触发到上拉事件，把isFromSearch设为为false 
      });
      this.getBooklist();
    }
  },
  onLoad:function(){
    let that = this;
    that.getBooklist();
     that.setData({
       newsPanelHeight: 120 * that.data.callbackcount
     });
    
  }, /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(' ---------- onReady ----------')
  },
  upper: function () {
    // wx.showNavigationBarLoading()
    // this.refresh();
    // console.log("upper");
    // setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
   lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    console.log("总页数" + that.data.page_count)
    if (that.data.page_count == that.data.searchPageNum) {
      wx.showToast({
        title: '已经最后一页',
        icon: 'loading',
        duration: 1000
      })
    } else {
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 800);
    }
    console.log("lower")
  },
   refresh: function () {
     wx.showToast({
       title: '刷新中',
       icon: 'loading',
       duration: 2000
     });
     console.log("loaddata");
     this.setData({
       searchPageNum:1
     });
     this.getBooklist();
    //  setTimeout(function () {
    //    wx.showToast({
    //      title: '刷新成功',
    //      icon: 'success',
    //      duration: 1000
    //    })
    //  }, 3000)

   },
  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.setData({
      searchPageNum: this.data.searchPageNum + 1
    });
    console.log(this.data.searchPageNum);
    this.getNBooklist();

  },
  onShow() {
    var barnd = app.globalData.brand;
    var th = app.globalData.th;
    var age = app.globalData.age;
    var win = app.globalData.win;
    console.log(barnd + th + age + win);
    this.setData({
      brand_id: barnd,
      theme: th,
      read_age: age,
      win_prize: win
    });
    this.getBooklist();
  },
  /**
  * 生命周期函数--监听页面加载
  */
 
  // 下拉刷新
  getBooklist: function () {
    let that = this;
    // console.log("需要返回数据的个数:" + that.data.callbackcount)
   // console.log("搜索数据:" + that.data.searchKeyword)
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/goodsList&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'page_index': that.data.searchPageNum,//第几次加载
        'page_size': that.data.callbackcount,
        'sear_name': that.data.searchKeyword,
        'brand_id': that.data.brand_id,
        'theme': that.data.theme,
        'read_age': that.data.read_age,
        'win_prize': that.data.win_prize
      },
      success: function (res) {
       // console.log("获取列表页" + JSON.stringify(res.data.page_count));
        that.setData({
          page_count: res.data.page_count
        });
        if(res.data.data.length>0 && res.data.total_count > 0){
          var ss = 120 * res.data.data.length
          that.setData({
            newsPanelHeight: ss
          });
          that.setData({
            bookList: res.data.data
          });
        }else{
          that.setData({
            bookList: ''
          })
        }
       
      }
    })
  },
  // 页面上拉触底事件的处理函数
  getNBooklist: function () {
    let that = this;
    // console.log("需要返回数据的个数:" + that.data.callbackcount)
    // console.log("搜索数据:" + that.data.searchKeyword)
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/goods/goodsList&SSID=' + wx.getStorageSync("ssid"),
      method: 'POST',
      data: {
        'page_index': that.data.searchPageNum,//第几次加载
        'page_size': that.data.callbackcount,
        'sear_name': that.data.searchKeyword,
        'brand_id': that.data.brand_id,
        'theme': that.data.theme,
        'read_age': that.data.read_age,
        'win_prize': that.data.win_prize
      },
      success: function (res) {
        // console.log("获取列表页" + JSON.stringify(res.data));
        if (res.data.data.length > 0 && res.data.total_count > 0) {
          var str3 = that.data.bookList;
          for (var i = 0; i < res.data.data.length; i++) {
            str3.push(res.data.data[i]);
          }
          that.setData({
            bookList: str3
          });
          var ss = 120 * that.data.bookList.length
          that.setData({
            newsPanelHeight: ss
          });

        } else {
          that.setData({
            bookList: ''
          })
        }

      }
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
        if(res.data.code>0){
          wx.showToast({
            title: '收藏成功',
            icon:'none'
          });
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
    // wx.showToast({
    //   title: '收藏成功',
    //   icon:'none'
    // });
  },
  bindSkip:function(){
    //筛选
    wx.navigateTo({
      url: '../bookSelect/bookSelect',
    })

  }
}) 