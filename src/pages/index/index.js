import {
  MEMORANDUM_URL,
  MESSAGE_URL,
  REMINDER_URL,
  TODAY_TASK_URL,
  TODO_LIST_URL,
  CAPITAL_FLOW_URL
} from '../../constants/routePath';
import { navigateTo } from '../../utils/wxApi';

Page({
  data: {
    navList: [
      {
        imageUrl: '/src/assets/img/index/money.png',
        name: '财务管理',
        url: CAPITAL_FLOW_URL
      },
      {
        imageUrl: '/src/assets/img/index/memorandum.png',
        name: '我的备忘',
        url: MEMORANDUM_URL
      },
      // {
      //   imageUrl: '/src/assets/img/index/todo-list.png',
      //   name: '活动清单',
      //   url: TODO_LIST_URL
      // },
      // {
      //   imageUrl: '/src/assets/img/index/today.png',
      //   name: '今日待办',
      //   url: TODAY_TASK_URL
      // },
      {
        imageUrl: '/src/assets/img/index/reminder.png',
        name: '提醒事项',
        url: REMINDER_URL
      },
      // {
      //   imageUrl: '/src/assets/img/index/message.png',
      //   name: '消息中心',
      //   url: MESSAGE_URL
      // }
    ]
  },
  onShow() {
    const authLoginEl = this.selectComponent('#auth-login');
    authLoginEl && authLoginEl.refreshLoginStatus();
  },
  handleClickNav(e) {
    const { detail } = e.currentTarget.dataset;
    navigateTo(detail.url);
  }
})
