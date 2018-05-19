//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userBindInfo:[],
    hasUserBindInfo:false,
    userName: '',
    userNumber: '',
    userTeacher: '',
    tabTxt: [
      {
        'text': '点击选择老师',
        'originalText': '点击选择老师',
        'active': false,
        'child': [
          { 'id': 1, 'text': '贾老师' },
          { 'id': 2, 'text': '张老师' },
          { 'id': 3, 'text': '李老师' }
        ],
        'type': 0
      }
    ],
    searchParam: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log("onload onload");
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    //console.log("nullnullnullnullllllllllllllllllllllll")
    if (app.globalData.userBindInfo) {
      var that=this;
      //console.log("not nullllllllllllllllllllllll")
      console.log("app.globalData.userBindInfo" + app.globalData.userBindInfo);
      that.setData({
        userBindInfo: app.globalData.userBindInfo,
        hasUserBindInfo: true
      })
    }
  },
  //获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserName:function(e){
    var that=this;
    this.setData({
      userName: e.detail.value
    })
    //console.log("userName:" + that.data.userName)
  },
  getUserNumber: function (e) {
    var that=this;
    this.setData({
      userNumber: e.detail.value
    })
    //console.log("userNumber:" + that.data.userNumber)
  },
  //下拉表单：与一级按钮绑定事件
  filterTab: function (e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    var newTabTxt = data.map(function (e) {
      e.active = false;
      return e;
    });
    newTabTxt[index].active = !that.data.tabTxt[index].active;
    this.setData({
      tabTxt: data
    })

  },
  //下拉表单：与二级目录绑定事件
  filterTabChild: function (e) {
    //我需要切换选中项 修改展示文字 并收回抽屉  
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    if (typeof (e.target.dataset.id) == 'undefined' || e.target.dataset.id == '') {
      data[index].active = !that.data.tabTxt[index].active;
    }
    else {
      data[index].type = e.target.dataset.id;
      data[index].active = !that.data.tabTxt[index].active;
      if (e.target.dataset.id == '0') {
        data[index].text = that.data.tabTxt[index].originalText;
        //不限删除条件
        delete that.data.searchParam[index];
      }
      else {
        data[index].text = e.target.dataset.txt;
        //更改删除条件
        that.data.searchParam[index] = data[index].text;
      }
    }
    that.setData({
      tabTxt: data
    })
    //console.log(that.data.searchParam);

    that.setData({userTeacher:that.data.searchParam});
    //that.setData({ userName: that.data.searchParam });
    //that.setData({ userNumber: that.data.searchParam });
    //console.log("userName:" + that.data.userName);
    //console.log("userNumber:" + that.data.userNumber);
    //console.log("userTeacher:" + that.data.userTeacher);

    var obj1 = {};
    obj1.title = "userName";
    obj1.value = that.data.userName;
    var obj2 = {};
    obj2.title = "userNumber";
    obj2.value = that.data.userNumber;
    var obj3 = {};
    obj3.title = "userTeacher";
    obj3.value = that.data.userTeacher[0];
    //console.log(a);
    let userBindInfo = that.data.userBindInfo;
    userBindInfo.push(obj1);
    userBindInfo.push(obj2);
    userBindInfo.push(obj3);
    
    //console.log(that.data.userBindInfo);
    app.globalData.userBindInfo = that.data.userBindInfo;
    //console.log(app.globalData.userBindInfo);
  },

  //绑定信息函数
  bind:function(e){
    console.log("something");
    var that = this;
    console.log(that.data.userBindInfo);
    var Util= require('../../utils/util.js');
    wx.request({
      url: 'http://localhost:8080/WeChat/Bind',
      data: Util.json2Form({
        userNumber: that.data.userNumber,
        userName: that.data.userName,
        teacherName: that.data.userTeacher[0]
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
        that.setData({
          hasUserBindInfo:true
        })
        app.globalData.userBindInfo=that.data.userBindInfo;     
        that.setData({
          userBindInfo: app.globalData.userBindInfo
        })
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }  
    })
  }
})
