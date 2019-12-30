import { serviceLogout } from '../../../services/user';

Page({
  data: {
    cellList: [
      // {
      //   name: '消息中心',
      //   url: '',
      //   icon: '/src/assets/img/index/about.png'
      // },
      // {
      //   name: '消息通知',
      //   url: '',
      //   icon: '/src/assets/img/index/about.png'
      // },
      // {
      //   name: '账号设置',
      //   url: '',
      //   icon: '/src/assets/img/index/about.png'
      // }
    ],
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
  },
  handleToPage() {

  }
})
