// pages/book/book.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objdata: [],
    allcount: null,
    page: 1,
    navId: "1",
    navTopId:"0",
    curNavId:null,
    isOnLoad: true,
    navnamelist: [{
        mid: 0,
        name: "所有"
      },
      {
        mid: 2,
        name: "纸质书"
      },
      {
        mid: 3,
        name: "电子书"
      },
      {
        mid: 4,
        name: "我的收藏"
      },
      {
        mid: 5,
        name: "每周特价"
      },
      {
        mid: 6,
        name: "预售"
      },
      {
        mid: 7,
        name: "免费"
      },
      {
        mid: 8,
        name: "诚征译者"
      },
      {
        mid: 9,
        name: "可兑换"
      }
    ],
    navcolor: "white"
  },
  showdata: function() {
    wx.request({
      url: hostname + this.data.reqUrl,
      data:{
        page: this.data.page,
        limit: 10,
      },
      success: (response) => {
        this.setData({
          objdata: this.data.objdata.concat(response.data.data[0]),
          allcount: Math.ceil(response.data.data[1][0].nums / 10)
        });
      }
    });
    console.log(this.data.objdata, this.data.page);
  },
  datainit: function() {
    this.setData({
      objdata: [],
      page: 0
    });
    if (this.data.allcount < this.data.page) {
      wx.showToast({
        title: '数据已全部更新',
        icon: "success"
      })
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
  },
  // 最新 按钮
  uptodate: function(e) {
    console.log(e.currentTarget.id);
    this.setData({
      reqUrl: "/index/indexbookslist",
      navId: e.currentTarget.id
    });
    this.datainit();
    this.showdata();
  },
  // 热门 按钮
  hot: function(e) {
    this.setData({
      reqUrl: "/index/hotbookslist",
      navId: e.currentTarget.id
    });
    this.datainit();
    this.showdata();
  },
  // 推荐 按钮
  recommend: function(e) {
    this.setData({
      reqUrl: "/index/recommendlist",
      navId: e.currentTarget.id
    });
    this.datainit();
    this.showdata();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.isOnLoad) {
      this.setData({
        reqUrl: "/index/indexbookslist"
      });
      this.showdata();
      this.setData({
        isOnLoad: false
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
    if (this.data.allcount <= this.data.page) {
      wx.showToast({
        title: '数据已全部更新',
        icon: "success"
      })
      return;
    }
    this.setData({
      page: this.data.page + 1
    });
    this.showdata();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  navclicklist: function(e) {
    this.setData({
      // navTopId: e.currentTarget.id,
      curNavId:e.currentTarget.id
    });
    if (e.currentTarget.id == "1") {

    }
    console.log(this.data.curNavId, e);
  }
})