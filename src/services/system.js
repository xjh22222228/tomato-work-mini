import api from '../api/index';
import { get } from '../utils/request';

// 获取系统信息
export function serviceGetSystemInfo() {
  return get(api.getSystemInfo);
}

