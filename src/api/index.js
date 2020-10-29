
const API = {
  user: {
    // 账号密码登录
    login: '/passport/local',
    // 退出登录
    logout: '/logout',
    // 更新用户
    update: '/user/update',
    // 获取用户配置
    getConfig: '/userConfig'
  },
  // 提醒事项
  reminder: '/reminder',
  // 今日待办
  todayTask: '/task',
  // 资金流动类型
  capitalFlowType: '/capitalFlowType',
  // 资金流动
  capitalFlow: '/capitalFlow',
  // 获取资金流动金额
  getCapitalFlowPrice: '/capitalFlow/price',
  // 备忘录
  memorandum: '/memorandum',
  // 站内消息
  innerMessage: '/innerMessage',
  // 活动清单
  todoList: '/todoList',
  // 获取首页面板数据
  getPanelData: '/panel'
}

export default API
