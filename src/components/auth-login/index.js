
Component({
  data: {
    showLogin: false,
    isLogin: false
  },
  lifetimes: {
    attached() {
      this.refreshLoginStatus()
    }
  },
  methods: {
    // 暴露给父组件方法
    refreshLoginStatus() {
      const { globalData } = getApp()
      this.setData({
        isLogin: globalData.isLogin
      })
      this.triggerEvent('change', {
        isLogin: globalData.isLogin,
        userInfo: globalData.userInfo
      })
    },
    onClose() {
      this.setData({ showLogin: false })
      this.refreshLoginStatus()
    },
    handleLoginButton() {
      this.setData({ showLogin: true })
    }
  }
})
