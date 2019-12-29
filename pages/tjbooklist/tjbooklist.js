// pages/tjbooklist/tjbooklist.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tjbooklist: [],
    page: 1,
    pagenums: null
  },
  getTjBookList: function() {
    wx.request({
      url: hostname + '/index/recommendlist',
      data: {
        page: this.data.page,
        limit: 10
      },
      success: (response) => {
        // console.log(response);
        this.setData({
          tjbooklist: this.data.tjbooklist.concat(response.data.data[0]),
          pagenums: Math.ceil(response.data.data[1][0].nums / 10)
        });
        // console.log(this.data.pagenums, this.data.hotbooklist);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTjBookList();
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
    if (this.data.page > this.data.pagenums) {
      wx.showToast({
        title: '无最新数据了',
        icon: "success",
        duration: 2000
      })
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
    this.getTjBookList();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})