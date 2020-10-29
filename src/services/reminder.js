import api from '../api/index'
import dayjs from 'dayjs'
import { get, post, del, put } from '../utils/request'

// 新增
export function serviceCreateReminder(data) {
  return post(api.reminder, data)
}

// 查询
export async function serviceGetReminder(data) {
  const res = await get(api.reminder, {
    type: 1,
    ...data
  })
  res.rows = res.rows.map(item => {
    item.__date__ = dayjs(item.date).format('YYYY.MM.DD HH:mm')
    item.__hasChecked__ = item.type === 1
    item.__statusText__ = item.type === 1 ? '进行中' : '已通知'
    item.__loading__ = false
    return item
  })
  return res
}

// 删除
export function serviceDeleteReminder(id) {
  return del(`${api.reminder}/${id}`)
}

// 更新
export function serviceUpdateReminder(id, data) {
  return put(`${api.reminder}/${id}`, data)
}
