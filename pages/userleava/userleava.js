// pages/userleava/userleava.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lycontent : ""
  },
  leaveSub:function(e){
    this.setData({
      lycontent: e.detail.value.userleava
    });
    wx.request({
      url: hostname + '/users/uleava',
      method: "post",
      header:{
        "content-type": "application/json",
        cookie: wx.getStorageSync('token')
      },
      data:{
        content: this.data.lycontent,
        cookie: wx.getStorageSync("token")
      },
      success:(response)=>{
        console.log(response);
        if (response.data.code == 1){
          wx.showToast({
            title: '留言成功',
            icon: "success"
          });
          wx.switchTab({
            url: '/pages/viewpoint/viewpoint',
          })
        }
      }
    })
    console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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