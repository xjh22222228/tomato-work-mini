import http from '../utils/request';
import api from '../api/index';

// 获取系统信息
export function serviceGetSystemInfo() {
  return http.get(api.getSystemInfo);
}

