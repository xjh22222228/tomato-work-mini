import api from '../api/index'
import { get } from '../utils/request'

// 获取后台首页面板数据
export function serviceGetPanelData(data) {
  return get(api.getPanelData, data)
}
