import {
  MEMORANDUM_URL,
  MESSAGE_URL,
  REMINDER_URL,
  TODAY_TASK_URL,
  TODO_LIST_URL,
  CAPITAL_FLOW_URL
} from '../../constants/routePath';
import { navigateTo } from '../../utils/wxApi';
import dayjs from 'dayjs';

const WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Page({
  data: {
    navList: [
      {
        imageUrl: '/src/assets/img/index/1.png',
        name: '财务管理',
        url: CAPITAL_FLOW_URL,
        shadowColor: 'rgba(74, 133, 248, .5)'
      },
      {
        imageUrl: '/src/assets/img/index/2.png',
        name: '我的备忘',
        url: MEMORANDUM_URL,
        shadowColor: 'rgba(255, 185, 64, .5)'
      },
      {
        imageUrl: '/src/assets/img/index/3.png',
        name: '活动清单',
        url: TODO_LIST_URL,
        shadowColor: 'rgba(117, 74, 248, .5)'
      },
      // {
      //   imageUrl: '/src/assets/img/index/1.png',
      //   name: '今日待办',
      //   url: TODAY_TASK_URL
      // },
      {
        imageUrl: '/src/assets/img/index/1.png',
        name: '提醒事项',
        url: REMINDER_URL,
        shadowColor: 'rgba(74, 133, 248, .5)'
      }
    ],
    time: '',
    week: WEEK[new Date().getDay()]
  },
  onShow() {
    this.initDate();
    const authLoginEl = this.selectComponent('#auth-login');
    authLoginEl && authLoginEl.refreshLoginStatus();
  },
  onHide() {
    clearTimeout(this.initDate);
  },
  handleClickNav(e) {
    const { detail } = e.currentTarget.dataset;
    navigateTo(detail.url);
  },
  initDate() {
    const time = dayjs().format('MM/DD HH:mm:ss');
    this.setData({
      time
    });

    setTimeout(this.initDate, 1000);
  }
})
