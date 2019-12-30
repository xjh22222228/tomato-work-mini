import http from '../utils/request';
import api from '../api/index';
import { USER_INFO, LOGIN_NAME } from '../constants/index';

// 通过账号密码登录
export async function serviceLogin(data) {
  const result = await http.post(api.login, data);
  const { globalData } = getApp();
  const userInfo = result.userInfo;
  globalData.userInfo = userInfo;
  globalData.isLogin = true;
  wx.setStorage({ key: USER_INFO, data: userInfo });
  wx.setStorage({ key: LOGIN_NAME, data: userInfo.loginName });
  return result;
}

// 退出登录
export function serviceLogout() {
  const { globalData } = getApp();
  globalData.isLogin = false;
  wx.removeStorage({ key: USER_INFO });
}

// 更新用户信息
export function serviceUpdateUser(data) {
  return http.post(api.updateUser, data, {
    successAlert: true
  });
}

// 获取用户配置信息
export function serviceGetUserConfig() {
  return http.get(api.getUserConfig);
}

// 更新用户配置信息
export function serviceUpdateUserConfig(data) {
  return http.put(api.getUserConfig, data, { successAlert: true });
}
