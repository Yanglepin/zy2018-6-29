var tcity = require("../../utils/citys.js");
var app = getApp();
Page({
  data: {
    name: '',
    sex: '',
    sex_name: '',
    birth: '',
    address: '',
    provinces: [],
    province: '',
    citys: [],
    city: '',
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    ImgUrl: app.data.URL,
    province_id: '',
    city_id: '',
    district_id: '',
    addressProvince: {},  //省
    addressCity: {},     //市
    addressDistrict: {},    //区
    items: [
      { name: '1', value: '男' },
      { name: '2', value: '女' },
      { name: '0', value: '保密' }
    ]
  },



  onLoad: function () {
    this.getUserInfo();//获取用户信息
    this.onPicker(); //获取省份信息
    // this.getCityListInfo(); 
  },

  // 获取用户信息
  getUserInfo: function () {
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/personalData&SSID=' + wx.getStorageSync("ssid"),
      success: function (res) {
        //console.log(that.data.provinces.length);
        var va1 = 0;
        const citys = [];
        const countys = [];
        for (var i = 0; i < that.data.provinces.length;i++){
         // console.log(that.data.provinces)
         
          if (that.data.provinces[i] == res.data.province_name){
            //console.log(i)
              va1 = i;
            }
        }   
        var va2 = 0;
        //console.log(that.data.cityData[va1].sub);
        for (var j = 0; j < that.data.cityData[va1].sub.length; j++){
          //console.log(res.data.city_id);
          citys.push(that.data.cityData[va1].sub[j].name);
          if (that.data.cityData[va1].sub[j] && that.data.cityData[va1].sub[j].code == res.data.city_id) {
            va2 = j;
          }

        }   
        var va3 = 0;
        //console.log(that.data.cityData[va1].sub[va2].sub)
        for (var i = 0; i < that.data.cityData[va1].sub[va2].sub.length; i++) {
          countys.push(that.data.cityData[va1].sub[va2].sub[i].name);
          if (that.data.cityData[va1].sub[va2].sub[i].code == res.data.district_id) {
            va3 = i;
          }

        }   
    
        //console.log(va3);
        // console.log("获取用户性别" + JSON.stringify(sex2));
        that.setData({
          name: res.data.real_name,
          sex: res.data.sex,
          birth: res.data.birthday,
          address: res.data.address_info,
          province: res.data.province_name,
          city: res.data.city_name,
          county: res.data.district_name,
          province_id: res.data.province_id,
          city_id: res.data.city_id,
          district_id: res.data.district_id,
          value:[va1,va2,va3],
          citys: citys,
          countys: countys
        })
      }
    })
  },
  // getCityListInfo: function () {
  //   let that = this;
  //   wx.request({
  //     url: that.data.ImgUrl + 'index.php?s=/api/goods/getAddressAll2&SSID=' + wx.getStorageSync("ssid"),
  //     method: 'POST',
  //     data: {

  //     },
  //     success: function (res) {
  //       that.setData({
  //         address: res.data.address_info,
  //         province: res.data.province_name,
  //         city: res.data.city_name,
  //         county: res.data.district_name
  //       })

  //     },
  //     error: function (xhr, type, errorThrow) {
  //       console.log(type)
  //     }
  //   })


  // },
  // 获取宝宝姓名 
  nameInput: function (e) {
    var tempname = e.detail.value
    this.name = tempname
    this.setData({
      name: e.detail.value
    })
  },

  // 获取宝宝性别  
  radioChange: function (e) {
    var tempsex = e.detail.value
    this.sex = tempsex
    this.setData({
      sex: e.detail.value
    })
    // console.log("00000" + e.detail.value);
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
    this.province_list = tempaddress
    this.setData({
      province_name: e.detail.value
    })
    console.log("获取地址" + JSON.stringify(e.detail.value)); return;
  },
  // 获取地址省
  // provinceInput: function (e) {
  //   var tempprovince = e.detail.value
  //   this.province_list.province_name = tempprovince
  //   this.setData({
  //     province_name: e.detail.value
  //   })
  //   console.log("获取地址" + JSON.stringify(e.detail.value)); return;
  // },
  // // 获取地址市
  // cityInput: function (e) {
  //   var tempcity = e.detail.value
  //   this.city_name = tempcity
  //   this.setData({
  //     city_name: e.detail.value
  //   })
  // },
  // // 获取地址区
  // districtInput: function (e) {
  //   var tempdistrict = e.detail.value
  //   this.district_name = tempdistrict
  //   this.setData({
  //     district_name: e.detail.value
  //   })
  // },


  bindAlter: function () {
    // console.log(this.data.province_id);
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
    let that = this;
    wx.request({
      url: that.data.ImgUrl + 'index.php?s=/api/member/updateMemberZiLiao&SSID=' + wx.getStorageSync("ssid"),
      data: {
        real_name: that.data.name,
        sex: that.data.sex,
        birthday: that.data.birth,
        address: that.data.address,
        province_id: that.data.province_id,
        city_id: that.data.city_id,
        district_id: that.data.district_id,
        province: that.data.province_name,
        city: that.data.city_name,
        county: that.data.district_name
      },
      success: function (res) {
        // console.log("省" + JSON.stringify(that.data.province_id));return;
        if (res.data.code > 0) {
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
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;
    //console.log(t);
    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      //console.log(cityData);
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0],
        province_id: cityData[val[0]].code,
        city_id: cityData[val[0]].sub[0].code,
        district_id: cityData[val[0]].sub[0].sub[0].code,

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
        value: [val[0], val[1], 0],
        city_id: cityData[val[0]].sub[val[1]].code,
        district_id: cityData[val[0]].sub[val[1]].sub[0].code,
      })
      return;
    }
    if (val[2] != t[2]) {
      //console.log(cityData[val[0]].sub[val[1]].sub[val[2]].name);
      this.setData({
        county: this.data.countys[val[2]],
        district_id: cityData[val[0]].sub[val[1]].sub[val[2]].code,
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
    // console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    // console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    //console.log(cityData[0].name);
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    });

    // console.log('初始化完成');
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