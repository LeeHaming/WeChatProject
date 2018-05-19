// pages/postRequest/postRequest.js
//获取应用实例
const app = getApp()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    userBindInfo:[],
    postTitle:"",
    PostContent:""
  },

  putPost:function(){
    console.log("something");
    var that = this;
    console.log(that.data.userBindInfo);
    var Util = require('../../utils/util.js');
    wx.request({
      url: 'http://localhost:8080/WeChat/PutPost',
      data: Util.json2Form({
        userNumber: that.data.userBindInfo[1].value,
        //userName: that.data.userName,
        //teacherName: that.data.userTeacher[0],
        postTitle: that.data.postTitle,
        postContent: that.data.postContent
      }),
      method: 'POST',
      header: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
      },
      complete: function (res) {
        console.log("hhhhhhhhhhhhhhhhhhhh")
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        that.data.hasUserBindInfo = true;
        app.globalData.userBindInfo = that.data.userBindInfo;

        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }
    })
  },
  getPostTitle: function (e) {
    var that = this;
    this.setData({
      postTitle: e.detail.value
    })
    console.log("postTitle:" + that.data.postTitle)
  },
  getPostContent: function(e) {
    var that = this;
    this.setData({
      postContent: e.detail.value
    })
    console.log("getPostContent:" + that.data.postContent)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userBindInfo) {
      console.log("not nullllllllllllllllllllllll")
      console.log(app.globalData.userBindInfo);
      this.setData({
        userBindInfo: app.globalData.userBindInfo,
        hasUserBindInfo: true
      })
    }
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