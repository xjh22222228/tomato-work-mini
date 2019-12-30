import http from '../utils/request';
import api from '../api/index';

// 创建
export function serviceCreateTask(data) {
  return http.post(api.todayTask, data, { successAlert: true });
}

// 查询
export function serviceGetTask(data) {
  return http.get(api.todayTask, data, { isLoading: true });
}

// 删除
export function serviceDeleteTask(id) {
  return http.delete(`${api.todayTask}/${id}`);
}

// 更新
export function serviceUpdateTask(id, data) {
  return http.put(`${api.todayTask}/${id}`, data);
}