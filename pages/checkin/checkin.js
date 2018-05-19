// pages/checkin/checkin.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkboxitems: [
      { name: "贾老师", value: "贾老师:周一(8：30--10：00)"},
      { name: "张老师", value: "张老师:周一(14：30--16：00)" },
      { name: "李老师", value: "李老师:周五(8：30--10：00)" }
    ],
    userBindInfo:[],
    address:""
  },

  checkIn:function(){
    console.log("something");
    var that = this;
    console.log(app.globalData.userBindInfo);
    that.setData({
      userBindInfo : app.globalData.userBindInfo
      });
    //console.log("that.data.userBindInfo.userNumber:");
    console.log(that.data.userBindInfo[1].value);
    var Util = require('../../utils/util.js');
    wx.request({
      url: 'http://localhost:8080/WeChat/CheckIn',
      data: Util.json2Form({
        userNumber: that.data.userBindInfo[1].value,
        address:that.data.address
      }),
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
      },
      complete: function (res) {
        console.log("hhhhhhhhhhhhhhhhhhhh")
        console.log("address:")
        console.log(that.data.address)
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })

        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!(app.globalData.userBindInfo)) {
      wx.showToast({
        title: '请绑定信息',
        icon: "loading",
        duration: 2000
      })
    }
    var that = this;
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'DUMBZ-RFTKO-QDBWQ-S3TIH-IXKK2-7CFD4' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var addr = addressRes.result.formatted_addresses.recommend;
            that.setData({
              address: addr
            })
            console.log(that.data.address)
          }
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
    if (!(app.globalData.userBindInfo)) {
      wx.showToast({
        title: '请绑定信息',
        icon: "loading",
        duration: 2000
      })
    }
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
  
  }
})