// pages/bookslist/bookslist.js
let app = getApp();
let hostname = app.globalData.hostname;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navnamelist:[],
    bookinfo : {},
    tjbooklist : [],
    news:[{
      nid:1,
      title:"最新书讯",
      content:"7月书讯：众多经典著作重装上市！"
    }, {
        nid:2,
        title: "纸质书开同预售",
        content: "第一时间寄给你！"
    }, {
        nid:3,
        title: "电子书阅读奖励计划",
        content: "让买书即变成习惯！"
    }],
    page:1,
    tjpage:1
  },
  getTjBookList:function(){
    wx.request({
      url: hostname + '/index/recommendlist',
      data: {
        page: this.data.tjpage,
        limit: 10
      },
      success: (response) => {
        // console.log(response);
        this.setData({
          tjbooklist: this.data.tjbooklist.concat(response.data.data[0]),
          tjpage: this.data.tjpage + 1
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: hostname + "/kinds/getFaKind",
      success: (response) => {
        response.data.forEach((el) => {
          this.setData({
            navnamelist: this.data.navnamelist.concat(el)
          });
          // console.log(el);
        });
      }
    });

    wx.request({
      url: hostname + '/index/indexbookslist',
      data:{
        page : this.data.page
      },
      success:(reqdata)=>{
        this.setData({
          bookinfo : reqdata.data.data[0]
        });
      },
      fail:(err)=>{
        console.log(err);
      }
    });

    this.getTjBookList();

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