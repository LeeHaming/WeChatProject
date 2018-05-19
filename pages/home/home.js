// pages/home/home.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userBindInfo: [],
    hasUserBindInfo:false
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {
    var that=this;
    if (app.globalData.userInfo) {
      //console.log("begingebin");
      //console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (app.globalData.userBindInfo) {
      that.setData({
        userBindInfo: app.globalData.userBindInfo,
        hasUserBindInfo: true
      })
    }
   else{
      wx.showToast({
        title: '请绑定信息',
        icon:"loading",
        duration: 2000
      })  
      } 
    //console.log("finalfinal");
    //console.log(that.data.userBindInfo[0].value);
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  postRequst: function () {
    wx.navigateTo({
      url: '../postRequest/postRequest'
    })
  },
  remarkRequest:function(){
    wx.navigateTo({
      url: '../remarkRequest/remarkRequest'
    })
  },
  onShow: function () {
    if (!(app.globalData.userBindInfo)) {
      wx.showToast({
        title: '请绑定信息',
        icon: "loading",
        duration: 2000
      })
    }
  }
})