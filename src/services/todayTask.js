import api from '../api/index';
import { get, post, del, put } from '../utils/request';

// 创建
export function serviceCreateTask(data) {
  return post(api.todayTask, data, { successAlert: true });
}

// 查询
export function serviceGetTask(data) {
  return get(api.todayTask, data, { isLoading: true });
}

// 删除
export function serviceDeleteTask(id) {
  return del(`${api.todayTask}/${id}`);
}

// 更新
export function serviceUpdateTask(id, data) {
  return put(`${api.todayTask}/${id}`, data);
}