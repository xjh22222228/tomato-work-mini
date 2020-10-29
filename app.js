import { USER_INFO } from './src/constants/storage'

App({
  globalData: {
    // 是否已登录
    isLogin: false,

    // 用户信息
    userInfo: {
      provider: '', // github ?
      uid: null, // 用户ID
      createdAt: '', // 注册时间
      bio: '', // 简介
      username: '', // 昵称
      password: '', // 经过MD5加密后的密码
      loginName: '', // 登录名
      avatarUrl: '', // 头像
      email: '',
      role: '',
      token: null, // 登录凭证
      location: ''
    }
  },
  onLaunch: function () {
    const userInfo = wx.getStorageSync(USER_INFO) || {}
    this.globalData.userInfo = userInfo
    this.globalData.isLogin = !!userInfo.token || false
  },
})
