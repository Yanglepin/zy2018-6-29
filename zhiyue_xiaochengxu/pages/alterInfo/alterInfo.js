var tcity = require("../../utils/citys.js");
var app = getApp();
Page({
  data: {
    name: '',
    sex: '',
    birth: '',
    address: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },
  // 获取用户信息
  getUserInfo: function () {
    let that = this;
    console.log("openid" + app.openId);
    wx.request({
      url: 'https://gxs.ltg365.com/api/System/GetBoxObey?openid=' + app.openId,
      success: function (res) {
          that.name = res.data.data.name,
          that.sex = res.data.data.sex,
          that.birth = res.data.data.birth,
          that.address = res.data.data.address
        that.setData({
          name: res.data.data.name,
          phone: res.data.data.sex,
          birth: res.data.data.birth,
          address: res.data.data.address
        })
      }
    })
  },
  // 获取宝宝姓名 
  nameInput: function (e) {
    var tempname = e.detail.value
    this.name = tempname
    this.setData({
      name: e.detail.value
    })
  },

  // 获取宝宝性别  
  sexInput: function (e) {
    var tempsex = e.detail.value
    this.sex = tempsex
    this.setData({
      sex: e.detail.value
    })
  },

  // 获取宝宝生日
  birthInput: function (e) {
    var tempbirth = e.detail.value
    this.birth = tempbirth
    this.setData({
      birth: e.detail.value
    })
  },
  // 获取地址
  addressInput: function (e) {
    var tempaddress = e.detail.value
    this.address = tempaddress
    this.setData({
      address: e.detail.value
    })
  },
  bindAlter: function () {
    console.log("name" + this.data.name);
    console.log("sex" + this.data.sex);
    console.log("birth" + this.data.birth);
    console.log("address" + this.data.address);
    if (this.data.name == "" || this.data.name == undefined) {
      wx.showModal({
        title: '请输入宝宝姓名！'
      })
    }
    if (this.data.sex == "" || this.data.sex == undefined) {
      wx.showModal({
        title: '请输入宝宝性别！'
      })
    }
    if (this.data.birth == "" || this.data.birth == undefined) {
      wx.showModal({
        title: '请输入宝宝生日！'
      })   
    }
    if (this.data.address == "" || this.data.address == undefined) {
      wx.showModal({
        title: '请输入地址！'
      })
    }
    wx.request({
      url: 'https://gxs.ltg365.com/api/System/updateBoxObey',
      data: { 
          name: that.name, 
          sex: that.sex, 
          birth: that.birth,
          address: that.address 
      },
      success: function (res) {
        console.log("data" + res.data.data)
        var result = res.data.data
        if (result == "true") {
          wx.showModal({
            title: '保存成功！'
          }) 
        } else {
          wx.showModal({
            title: '保存失败！请重试'
          }) 
        }
      }
    })
  },
  // picker
  // bindPickerChange1: function (e) {
  //   var that = this;
  //   that.setData({
  //     index1: e.detail.value
  //   })
  // },
  // bindPickerChange2: function (e) {
  //   var that = this;
  //   that.setData({
  //     index2: e.detail.value
  //   })
  // },
  // bindPickerChange3: function (e) {
  //   var that = this;
  //   that.setData({
  //     index3: e.detail.value
  //   })
  // },

  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },

  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },

  onLoad: function () {
    this.getUserInfo();//获取用户信息
    this.onPicker(); //获取省份信息
  },
  //三级联动
  onPicker: function () {
    var that = this;

    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
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
  }

})