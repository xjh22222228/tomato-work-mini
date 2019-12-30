import dayjs from 'dayjs';
import http from '../utils/request';
import api from '../api/index';

// 查询
export async function serviceGetInnerMessage(data) {
  const res = await http.get(api.innerMessage, data);
  res.rows = res.rows.map(item => {
    item.__date__ = dayjs(item.createdAt).format('YYYY-MM-DD');
    return item;
  });
  return res;
}

// 标志已读
export function serviceUpdateInnerMessageHasRead(id) {
  return http.put(`${api.innerMessage}/${id}`, null);
}
