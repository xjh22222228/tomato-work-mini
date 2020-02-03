import dayjs from 'dayjs';
import api from '../api/index';
import { get, put } from '../utils/request';

// 查询
export async function serviceGetInnerMessage(data) {
  const res = await get(api.innerMessage, data);
  res.rows = res.rows.map(item => {
    item.__date__ = dayjs(item.createdAt).format('YYYY-MM-DD');
    return item;
  });
  return res;
}

// 标志已读
export function serviceUpdateInnerMessageHasRead(id) {
  return put(`${api.innerMessage}/${id}`, null);
}
