import api from '../api/index'
import dayjs from 'dayjs'
import { getWeek } from '../utils/date'
import { get, post, del, put } from '../utils/request'

// 类型
export async function serviceGetBillType() {
  let res = await get(api.billType)
  res = res
    .map((item) => {
      item.text = (item.type === 1 ? '收入 - ' : '支出 - ') + item.name
      item.value = item.id
      return item
    })
    .sort((a, b) => a.type - b.type)

  return res
}

export function serviceDeleteBillType(id) {
  return del(`${api.billType}/${id}`, { successAlert: true })
}

export function serviceUpdateBillType(id, data) {
  return put(`${api.billType}/${id}`, data, { successAlert: true })
}

export function serviceCreateBillType(data) {
  return post(api.billType, data, { successAlert: true })
}

// 流动资金
export async function serviceGetBill(params) {
  const result = await get(api.bill, params)
  result.rows = result.rows.map((item) => {
    const date = dayjs(item.createdAt).format('YYYY-MM-DD')
    const today = dayjs().format('YYYY-MM-DD')
    item.__date__ = date
    item.__week__ = date === today ? '今天' : getWeek(item.createdAt)
    item.__statusText__ = item.type === 1 ? '收入' : '支出'
    item.__tagType__ = item.type === 1 ? 'primary' : 'danger'
    item.__symbol__ = item.type === 1 ? '+' : '-'
    item.__priceColor__ = item.type === 1 ? '#f50' : '#000'
    return item
  })
  return result
}

export function serviceDeleteBill(id) {
  return del(`${api.bill}/${id}`, {
    isLoading: true,
    loadingText: '删除中...',
  })
}

export function serviceUpdateBill(id, data) {
  return put(`${api.bill}/${id}`, data)
}

export function serviceCreateBill(data) {
  return post(api.bill, data)
}
