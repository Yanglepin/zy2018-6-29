var app = getApp();
Page({
  data: {
    send: true,
    alreadySend: false,
    phone: '',
    keycode: '',
    isGet: false,
    second: 120,
    getCode: {},
    ImgUrl: app.data.URL
  },

  // 手机号部分 
  phoneInput: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum) 
        this.showSendMsg()
      }
     } 
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
      })
      return false
    }
  },
  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  // 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    // this.activeButton()
    // console.log('code' + this.data.code)
  },

  // 发送验证码 
  sendMsg: function () {
    let that=this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/login/sendSmsRegisterCode',
      data: {
        mobile: this.data.phoneNum
      },
      method: 'POST',
      success: function (res) {
        // console.log(JSON.stringify(res))
        wx.setStorageSync('ssid', res.data.SSID);
        that.setData({
          PHPSESSID: res.data.SSID
        })
        wx.showToast({
          title: '发送成功',
        })
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 120,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //事件处理函数
  bindSkip: function () {
    wx.navigateTo({
      url: '../Member/myInfo'
    })
  },

//登录
  onSubmit: function () {
    let that = this;
    console.log(wx.getStorageSync("ssid"));
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/login/index&SSID='+wx.getStorageSync("ssid"),
      data: {
        mobile: this.data.phoneNum,
        sms_captcha: this.data.code
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.code)
        if (res.data.code > 0) {
          wx.showToast({
            title: '验证成功',
            icon: 'success'
          })
          wx.navigateTo({
            url: '../index/index'
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }



})  