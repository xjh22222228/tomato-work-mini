import http from '../utils/request';
import api from '../api/index';
import dayjs from 'dayjs';

// 新增
export function serviceCreateReminder(data) {
  return http.post(api.reminder, data);
}

// 查询
export async function serviceGetReminder(data) {
  const res = await http.get(api.reminder, data);
  res.rows = res.rows.map(item => {
    item.__date__ = dayjs(item.date).format('YYYY-MM-DD HH:mm');
    item.__statusText__ = item.type === 1 ? '待提醒' : '已提醒';
    item.__tagType__ = item.type === 1 ? 'danger' : 'success';
    return item;
  });
  return res;
}

// 删除
export function serviceDeleteReminder(id) {
  return http.delete(`${api.reminder}/${id}`);
}

// 更新
export function serviceUpdateReminder(id, data) {
  return http.put(`${api.reminder}/${id}`, data);
}
