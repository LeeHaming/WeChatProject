// pages/remarkRequest/remarkRequest.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    remarks:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //直接在这里查询已有的评论

  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost:8080/WeChat/GetRemarks',
      data: { userNumber:app.globalData.userBindInfo[1].value},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        console.log('submit success');
        console.log(res.data);
        console.log(res);
        that.setData({
          remarks: res.data
        })
        console.log(that.data.remarks)

      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
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