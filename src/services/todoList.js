import http from '../utils/request';
import api from '../api/index';

// 创建
export function serviceCreateTodoList(data) {
  return http.post(api.todoList, data);
}

// 查询
export function serviceGetTodoList(data) {
  return http.get(api.todoList, data);
}

// 删除
export function serviceDeleteTodoList(id) {
  return http.delete(`${api.todoList}/${id}`, { successAlert: true });
}

// 更新
export function serviceUpdateTodoList(id, data) {
  return http.put(`${api.todoList}/${id}`, data);
}