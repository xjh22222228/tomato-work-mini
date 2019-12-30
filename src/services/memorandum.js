import http from '../utils/request';
import api from '../api/index';

// 新增
export function serviceCreateMemorandum(data) {
  return http.post(api.memorandum, data, { successAlert: true });
}

// 查询所有
export function serviceGetMemorandum(data) {
  return http.get(api.memorandum, data);
}

// 通过id查询
export function serviceGetMemorandumById(id) {
  return http.get(`${api.memorandum}/${id}`, { isLoading: true });
}

// 删除
export function serviceDeleteMemorandum(id) {
  return http.delete(`${api.memorandum}/${id}`);
}

// 更新
export function serviceUpdateMemorandum(id, data) {
  return http.put(`${api.memorandum}/${id}`, data, { successAlert: true });
}
