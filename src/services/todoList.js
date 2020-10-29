import api from '../api/index'
import dayjs from 'dayjs'
import { get, post, del, put } from '../utils/request'

// 创建
export function serviceCreateTodoList(data) {
  return post(api.todoList, data)
}

// 查询
export async function serviceGetTodoList(data, config) {
  const res = await get(api.todoList, data, config)
  res.rows = res.rows.map(item => {
    item.__date__ = dayjs(item.createdAt).format('YYYY年M月D日')
    return item
  })

  return res
}

// 删除
export function serviceDeleteTodoList(id) {
  return del(`${api.todoList}/${id}`)
}

// 更新
export function serviceUpdateTodoList(id, data) {
  return put(`${api.todoList}/${id}`, data)
}
