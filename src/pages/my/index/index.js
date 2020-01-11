import { serviceLogout } from '../../../services/user';
import { MY_MESSAGE_URL } from '../../../constants/routePath';

Page({
  data: {
    cellList: [
      {
        name: '我的消息',
        url: MY_MESSAGE_URL,
        icon: '/src/assets/img/index/message.png'
      },
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
  }
})
