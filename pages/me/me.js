// pages/me/me.js
let app = getApp();
let hostname = app.globalData.hostname;
console.log(app.globalData);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: wx.getStorageSync("avatarUrl"),
    nickName: wx.getStorageSync("nickName"),
    codeId: "",
    appId: "",
    openid: "",
    isLogin: false
  },
  alreayWarrant: function() {
    wx.showToast({
      title: '授权成功',
      icon: "success"
    });
    // 获取用户信息 和 code 
    wx.getUserInfo({
      success: (usermsg) => {
        this.setData({
          avatarUrl: usermsg.userInfo.avatarUrl,
          nickName: usermsg.userInfo.nickName,
          codeId: app.globalData.codeId,
          appId: app.globalData.appId
        });
        wx.setStorageSync("avatarUrl", this.data.avatarUrl);
        wx.setStorageSync("nickName", this.data.nickName);
        console.log(usermsg);
        console.log(this.data);
        if (this.data.codeId != "") {
          wx.request({
            url: hostname + '/index/getcode',
            data: {
              avatarUrl: this.data.avatarUrl,
              nickName: this.data.nickName,
              appId: this.data.appId,
              codeId: this.data.codeId
            },
            success: (response) => {
              console.log(response);
              if (response.data.code == 1) {
                wx.setStorageSync('token', response.header['Set-Cookie']);
                console.log(response.header['Set-Cookie']);
                this.setData({
                  isLogin: true
                });
                console.log(this.data.isLogin);
              }
            }
          })
        }
      }
    });
  },
  //获取获取授权
  getWarrant: function(e) {
    let that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.alreayWarrant();
    } else {
      wx.showToast({
        title: '授权失败',
        icon: "none"
      })
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //留言按钮
  userLy: function() {
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: "/pages/userleava/userleava",
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: "none"
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("token")) {
      this.setData({
        isLogin: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})