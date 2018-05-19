// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postId:0,
    postTitle:"",
    postContent:"",
    postRemarks:[],
    newPostRemark:"",
    userNumber:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    var that=this;
    that.setData(
      {postId:options.id}
      );
    console.log(that.data.postId);
    wx.request({
      url: 'http://localhost:8080/WeChat/GetPostDetail',
      data: { postId: that.data.postId },
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },

      success: function (res) {
        console.log('submit success');
        console.log(res.data);
        console.log(res);

        var remarks=[];
        for(var i=0;i<res.data.length;i++){
          if (res.data[i].postRemark){
          remarks.push({value:res.data[i].postRemark});
          }
        }
        
        that.setData({
          postId: res.data[0].postId,
          postTitle: res.data[0].postTitle,
          userNumber: res.data[0].userNumber,
          postContent: res.data[0].postContent,
          postRemarks: remarks
        })
        console.log(that.data.postContent)
        console.log(that.data.postRemarks)
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }

    })
  },
  getNewPostRemark: function(e) {
    var that = this;
    this.setData({
      newPostRemark: e.detail.value
    })
    console.log("newPostRemark:" + that.data.newPostRemark)
  },
  putRemark:function(){
    console.log("something");
    var that = this;
    //console.log(that.data.userBindInfo);
    var Util = require('../../utils/util.js');
    wx.request({
      url: 'http://localhost:8080/WeChat/PutRemark',
      data: Util.json2Form({
        postId:that.data.postId,
        userNumber: that.data.userNumber,
        postTitle: that.data.postTitle,
        postContent: that.data.postContent,
        newPostRemark: that.data.newPostRemark
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
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
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