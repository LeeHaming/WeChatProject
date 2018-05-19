// pages/interactive/interactive.js
/*var WxParse = require('../../utils/wxParse/wxParse.js');
const content1 = require("../../content/1content.js");
const content2 = require("../../content/2content.js");
const content3 = require("../../content/3content.js");
const content4 = require("../../content/4content.js");
const content5 = require("../../content/5content.js");
//暂时还没有形成数组*/
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //posts: []
    item:[],
    postId:1
    //image_covers: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg','img5.jpg']
  },

  getDetail:function(e){
    var that=this
    //console.log(e.currentTarget.id);
    that.setData({ postId: e.currentTarget.id});
    //console.log(that.data.postId);
    var Id = String(that.data.postId)
    wx.navigateTo({
      url: '../detail/detail?id=' + Id
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
    //var that=this;
    /*var data = [{ content:content1.content},
      {content: content2.content },
      {content: content3.content },
      {content: content4.content },
      {content: content5.content }]
    console.log(data);
    this.setData({
      item:data
    })
    var content=new Array();
    //content.push("content"+String(4));///okokok
    
    for(var i=0;i<5;i++){
      var target="content"+String(i+1);
      //console.log(target);
      content.push(target);
      WxParse.wxParse(content[i],'html',data[i].content,that,25);
    }
    console.log(content);

    //console.log(wxParseData)
    //WxParse.wxParse(content[1], 'html', data[1].content, that, 25),
    //WxParse.wxParse(content[2], 'html', data[2].content, that, 25);
    //WxParse.wxParse(content[3], 'html', data[2].content, that, 25);
    //content.push(content1);
    //content.push(content2);
    //content.push(content3);

    //console.log(content[0])
     */
    var that = this;
    wx.request({
      url: 'http://localhost:8080/WeChat/GetAllPosts',
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },

      success: function (res) {
        console.log('submit success');
        console.log(res.data);
        console.log(res);
        
        that.setData({
          posts: res.data
        })
        console.log(that.data.posts)

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