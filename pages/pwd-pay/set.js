const WXAPI = require('odoo-wxapi')
const AUTH = require('../../utils/auth')
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  async submit() {
    if (!this.data.pwd) {
      wx.showToast({
        title: '请输入交易密码',
        icon: 'none'
      })
      return
    }
    if (!this.data.pwd2) {
      wx.showToast({
        title: '请再次输入交易密码',
        icon: 'none'
      })
      return
    }
    if (this.data.pwd != this.data.pwd2) {
      wx.showToast({
        title: '两次输入不一致',
        icon: 'none'
      })
      return
    }
    const res = await WXAPI.setPayPassword(wx.getStorageSync('token'), this.data.pwd)
    if (res.code == 2000) {
      AUTH.openLoginDialog()
      return
    }
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '设置成功'
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 0,
      })
    }, 1000);
  },
  processLogin(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
      })
      return;
    }
    AUTH.register(this);
  },
})