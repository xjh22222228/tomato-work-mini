import api from '../api/index';
import dayjs from 'dayjs';
import { getWeek } from '../utils/date';
import { get, post, del, put } from '../utils/request';

// 类型
export async function serviceGetCapitalFlowType() {
  let res = await get(api.capitalFlowType);
  res = res.map(item => {
    item.text = (item.type === 1 ? '收入 - ' : '支出 - ') + item.name;
    item.value = item.id;
    return item;
  }).sort((a, b) => a.type - b.type);

  return res;
}

export function serviceDeleteCapitalFlowType(id) {
  return del(`${api.capitalFlowType}/${id}`, { successAlert: true });
}

export function serviceUpdateCapitalFlowType(id, data) {
  return put(`${api.capitalFlowType}/${id}`, data, { successAlert: true });
}

export function serviceCreateCapitalFlowType(data) {
  return post(api.capitalFlowType, data, { successAlert: true });
}


// 流动资金
export async function serviceGetCapitalFlow(params) {
  const result = await get(api.capitalFlow, params);
  result.rows = result.rows.map(item => {
    const date = dayjs(item.date).format('YYYY-MM-DD');
    const today = dayjs().format('YYYY-MM-DD');
    item.__date__ = date;
    item.__week__ = date === today ? '今天' : getWeek(item.createdAt);
    item.__statusText__ = item.type === 1 ? '收入' : '支出';
    item.__tagType__ = item.type === 1 ? 'primary' : 'danger';
    item.__symbol__ = item.type === 1 ? '+' : '-';
    item.__priceColor__ = item.type === 1 ? '#f50' : '#000';
    return item;
  });
  return result;
}

export function serviceDeleteCapitalFlow(id) {
  return del(`${api.capitalFlow}/${id}`, {
    isLoading: true,
    loadingText: '删除中...'
  });
}

export function serviceUpdateCapitalFlow(id, data) {
  return put(`${api.capitalFlow}/${id}`, data);
}

export function serviceCreateCapitalFlow(data) {
  return post(api.capitalFlow, data);
}

export function serviceGetCapitalFlowPrice(data) {
  return get(api.getCapitalFlowPrice, data);
}