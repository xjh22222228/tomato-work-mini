import { serviceLogout } from '../../../services/user';
import dayjs from 'dayjs';

Page({
  data: {
    userInfo: {},
    totalDay: 0
  },
  onShow() {
    this.computedDay();
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
    this.computedDay();
  },
  computedDay() {
    const { createdAt } = this.data.userInfo;
    if (!createdAt) return;
    const createdAtTime = dayjs(createdAt).valueOf();
    const day = (Date.now() - createdAtTime) / (1000 * 60 * 60 * 24);
    this.setData({
      totalDay: Math.floor(day)
    });
  }
})
