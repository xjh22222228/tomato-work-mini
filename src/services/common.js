import http from '../utils/request';
import api from '../api/index';

// 获取后台首页面板数据
export function serviceGetPanelData(data) {
  return http.get(api.getPanelData, data);
}
