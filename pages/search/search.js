// pages/search/search.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resdata: [],
    allcount: null,
    page: 1,
    record: null,
    q: ""
  },
  getData: function () {
    wx.request({
      url: hostname + '/book/search',
      data: {
        q: this.data.q,
        page: this.data.page
      },
      success: (response) => {
        console.log(response);
        this.setData({
          resdata: this.data.resdata.concat(response.data[0]),
          record: response.data[1][0].nums,
          allcount: Math.ceil(response.data[1][0].nums / 10),
          page: this.data.page + 1
        });
      }
    });
  },
  getInputValue: function (e) {
    this.setData({
      resdata: [],
      q: e.detail.value.search,
      page: 1
    });
    this.getData();
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
    if (this.data.page > this.data.allcount) {
      wx.showToast({
        title: '暂无更多数据',
        icon: "success"
      })
      return;
    }
    this.getData();
    this.setData({
      page: this.data.page + 1
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})