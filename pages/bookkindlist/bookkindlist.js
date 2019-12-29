// pages/bookkindlist/bookkindlist.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindlistobj:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.cid);
    wx.request({
      url: hostname + '/index/kinddetailslist',
      data: {
        cid: options.cid
      },
      success:(response)=>{
        if (response.data.data[0].length == 0){
          this.setData({
            kindlistobj : ["暂无相关数据！"]
          });
          console.log(this.data.kindlistobj);
          return;
        }
        this.setData({
          kindlistobj:response.data.data[0]
        });
        // console.log(response.data.data[0]);
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