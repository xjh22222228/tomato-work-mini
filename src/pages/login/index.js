import { reLaunch } from '../../utils/wxApi'
import { HOME_URL } from '../../constants/routePath'

Page({
  data: {
    showLogin: true
  },
  onClose() {
    wx.navigateBack({
      fail() {
        reLaunch(HOME_URL)
      }
    })
  }
})
