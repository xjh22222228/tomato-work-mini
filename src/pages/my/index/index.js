import { serviceLogout } from '../../../services/user';

Page({
  data: {
    cellList: [],
    userInfo: {}
  },
  handleLogout() {
    serviceLogout();
    const authLoginEl = this.selectComponent('#auth-login');
    authLoginEl.refreshLoginStatus();
  },
  onAuthChange(e) {
    this.setData({
      userInfo: e.detail.userInfo
    });
  }
})
