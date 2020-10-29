import dayjs from 'dayjs'

/**
 * 获取某一天是星期几
 * @param {String|Number|Date} [date] - 可以被解析的日期
 * @returns {String}
 */
export function getWeek(date) {
  const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return arr[dayjs(date).day()]
}
