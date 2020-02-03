import api from '../api/index';
import { get, post, del, put } from '../utils/request';

// 创建
export function serviceCreateTodoList(data) {
  return post(api.todoList, data);
}

// 查询
export function serviceGetTodoList(data) {
  return get(api.todoList, data);
}

// 删除
export function serviceDeleteTodoList(id) {
  return del(`${api.todoList}/${id}`, { successAlert: true });
}

// 更新
export function serviceUpdateTodoList(id, data) {
  return put(`${api.todoList}/${id}`, data);
}