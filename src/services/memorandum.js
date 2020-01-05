import dayjs from 'dayjs';
import http from '../utils/request';
import api from '../api/index';

// 新增
export function serviceCreateMemorandum(data) {
  return http.post(api.memorandum, data, {
    isLoading: true,
    loadingText: '正在处理'
  });
}

// 查询所有
export async function serviceGetMemorandum(data) {
  let res = await http.get(api.memorandum, data);
  res = res.map(item => {
    item.__time__ = dayjs(item.createdAt).format('HH:ss');
    item.markdown = item.markdown.replace(/[\r\n]/g, '');
    return item;
  });
  return res;
}

// 通过id查询
export function serviceGetMemorandumById(id) {
  return http.get(`${api.memorandum}/${id}`, null, { isLoading: true });
}

// 删除
export function serviceDeleteMemorandumById(id) {
  return http.del(`${api.memorandum}/${id}`, null, {
    isLoading: true,
    loadingText: '删除中...'
  });
}

// 更新
export function serviceUpdateMemorandum(id, data) {
  return http.put(`${api.memorandum}/${id}`, data, {
    isLoading: true,
    loadingText: '正在处理...'
  });
}
